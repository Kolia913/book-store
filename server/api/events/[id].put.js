import Joi from "joi";
import { Event } from "~/server/database/models/Event";
import { replaceFiles } from "~/server/utils/fileStorage";

const schema = Joi.object({
  title: Joi.string().max(1024).optional(),
  description: Joi.string().allow(null, "").optional(),
  tickets_available: Joi.boolean().default(false).optional(),
  event_end: Joi.boolean().default(false).optional(),
  images: Joi.array().max(4).optional(),
 
});

export default defineEventHandler(async (event) => {
  let images = [];
  try {
    const id = getRouterParam(event, "id");
    if (!Number.isInteger(+id)) {
      setResponseStatus(event, 400);
      return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid event id",
      }).toJSON();
    }

    const events = await Event.findByPk(parseInt(id));
    if (!events) {
      setResponseStatus(event, 404);
      return createError({
        message: "Event not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }
    const body = await readMultipartFormData(event);
    const imagesToUpload = [];
    const data = {};
    if (body) {
      for (const item of body) {
        if (item.name === "images") {
          imagesToUpload.push(item);
        } else {
          data[item.name] = item.data.toString();
        }
      }
    }

    const oldImages =
      events.images === null ? [] : events.images.filter((img) => !!img);

    if (imagesToUpload?.length) {
      const bulkAdditionResult = await replaceFiles(oldImages, imagesToUpload);
      images = bulkAdditionResult.paths;
    }

    if (images.length) {
      data.images = images;
    } else {
      data.images = events.images;
    }

    const { error, value } = schema.validate(data);
    if (error) {
      imagesToUpload?.length && bulkRemoveFiles(images);
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    await events.update(value);

    setResponseStatus(event, 200);
    return events;
  } catch (err) {
    console.log(err);
    setResponseStatus(event, 500);
    bulkRemoveFiles(images);
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
