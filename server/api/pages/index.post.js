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
  const images = [];
  try {
    const body = await readMultipartFormData(event);
    const data = {};
    const content = {};

    for (const item of body) {
      if (item.name.startsWith("content")) {
        const path = item.name.split(".");
        let current = content;

        for (let i = 1; i < path.length - 1; i++) {
          if (!current[path[i]]) {
            current[path[i]] = {};
          }
          current = current[path[i]];
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
          images.push(imagePath);
          current["value"] = imagePath;
        } else {
          current[fieldName] = item.data.toString();
        }
      } else {
        data[item.name] = item.data.toString();
      }
    }
    const newData = adjustWithTypes({ ...data, content });
    const newContent = JSON.stringify(newData.content);
    newData.content = newContent;

    const { error, value } = schema.validate(newData);

    if (error) {
      bulkRemoveFiles(images);
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }

    const existingPage = await Page.findOne({
      where: {
        key: value.key,
      },
    });

    if (existingPage) {
      setResponseStatus(event, 409);
      return createError({
        message: "Page with this key already exists",
        statusCode: 409,
        statusMessage: "Conflict",
      }).toJSON();
    }

    const res = await Page.create(value);
    res.content = JSON.parse(res.content);
    setResponseStatus(event, 201);
    return res;
  } catch (err) {
    setResponseStatus(event, 500);
    bulkRemoveFiles(images);
    return createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    }).toJSON();
  }
});

function adjustWithTypes(data) {
  const dataClone = JSON.parse(JSON.stringify(data));
  const content = dataClone.content;

  for (const contentKey of Object.keys(content)) {
    if (content[contentKey]) {
      for (const sectionKey of Object.keys(content[contentKey])) {
        const section = content[contentKey][sectionKey];
        if (sectionKey === "isActive") {
          content[contentKey][sectionKey] = section === "true";
        } else if (
          typeof section === "object" &&
          "type" in section &&
          "value" in section
        ) {
          content[contentKey][sectionKey] = {
            ...section,
            value: castTo(section.type, section.value),
          };
        } else {
          content[contentKey][sectionKey] = section;
        }
      }
    }
  }
  return dataClone;
}
