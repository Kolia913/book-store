import Joi from "joi";
import { Page } from "~/server/database/models/Page";
import { addFile, bulkRemoveFiles } from "~/server/utils/fileStorage";
import { castTo } from "~/server/utils/helpers";

const schema = Joi.object({
  key: Joi.string().max(512).required(),
  admin_title: Joi.string().max(1024).required(),
  title: Joi.string().max(1024).required(),
  content: Joi.string().required(), // Storing content as a JSON string
});

export default defineEventHandler(async (event) => {
  const newImages = [];

  try {
    const id = getRouterParam(event, "id");

    if (!id || isNaN(id)) {
      setResponseStatus(event, 400);
      return createError({
        message: "Id is required and should be a number",
        statusCode: 400,
      }).toJSON();
    }

    const body = await readMultipartFormData(event);
    const data = {};
    const content = {};

    for (const item of body) {
      if (item.name.startsWith("content")) {
        const path = item.name.split(".");
        let current = content;

        for (let i = 1; i < path.length - 1; i++) {
          current = current[path[i]] = current[path[i]] || {};
        }

        const fieldName = path[path.length - 1];

        if (fieldName === "type" && item.data.toString() === "image") {
          current["type"] = "image";
        } else if (
          current["type"] === "image" &&
          fieldName === "value" &&
          item.filename
        ) {
          const imagePath = (await addFile(item)).path;
          newImages.push(imagePath);
          current["value"] = imagePath;
        } else {
          current[fieldName] = item.data.toString();
        }
      } else {
        data[item.name] = item.data.toString();
      }
    }

    const existingPage = await Page.findByPk(+id);

    if (!existingPage) {
      bulkRemoveFiles(newImages);
      setResponseStatus(event, 404);
      return createError({
        message: "Page not found",
        statusCode: 404,
      }).toJSON();
    }

    const oldContent = JSON.parse(existingPage.content);
    const newData = adjustWithTypes({ ...data, content });

    // Extract and delete old images
    const imagesToDelete = extractOldImages(newData.content, oldContent);
    bulkRemoveFiles(imagesToDelete);

    // Validate
    const { error, value } = schema.validate({
      ...newData,
      content: JSON.stringify(newData.content),
    });

    if (error) {
      bulkRemoveFiles(newImages);
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
      }).toJSON();
    }

    // Apply updates
    const flatNewData = flattenObject({
      ...value,
      content: JSON.parse(value.content),
    });
    existingPage.content = JSON.parse(existingPage.content);
    updateNestedObject(existingPage, flatNewData);

    // Save updated page
    await existingPage.update({
      content: JSON.stringify(existingPage.content),
    });

    setResponseStatus(event, 200);
    existingPage.content = JSON.parse(existingPage.content);
    return existingPage;
  } catch (err) {
    bulkRemoveFiles(newImages);
    return createError({
      message: "Something went wrong",
      statusCode: 500,
    }).toJSON();
  }
});

function adjustWithTypes(data) {
  const content = { ...data.content };

  Object.entries(content).forEach(([_key, section]) => {
    Object.entries(section).forEach(([sectionKey, value]) => {
      if (sectionKey === "isActive") {
        section[sectionKey] = value === "true";
      } else if (
        typeof value === "object" &&
        "type" in value &&
        "value" in value
      ) {
        section[sectionKey] = {
          ...value,
          value: castTo(value.type, value.value),
        };
      }
    });
  });

  return { ...data, content };
}

function extractOldImages(newContent, oldContent) {
  const flattenNew = flattenObject(newContent);
  const flattenOld = flattenObject(oldContent);

  return Object.entries(flattenOld)
    .filter(
      ([key, value]) =>
        key.includes("image.value") &&
        flattenNew[key] &&
        flattenNew[key] !== value
    )
    .map(([, value]) => value);
}

function flattenObject(obj, prefix = "") {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {});
}

function updateNestedObject(target, flatObject) {
  Object.entries(flatObject).forEach(([flatKey, value]) => {
    const keys = flatKey.split(".");
    let current = target;

    keys.slice(0, -1).forEach((key) => {
      current = current[key] = current[key] || {};
    });

    current[keys[keys.length - 1]] = value;
  });
}
