import Joi from "joi";
import { Event } from "~/server/database/models/Event";

const schema = Joi.object({
  title: Joi.string().max(1024).required(),
  description: Joi.string().allow(null, ""),
  tickets_available: Joi.boolean().default(false),
  event_end: Joi.boolean().default(false),
  images: Joi.array().max(4).default([]),

});

export default defineEventHandler(async (event) => {
  const images = [];
  try {
    const imagesToUpload = [];
    const body = await readMultipartFormData(event);
    const data = {};
    for (const item of body) {
      if (item.name === "images") {
        imagesToUpload.push(item);
      } else {
        data[item.name] = item.data.toString();
      }
    }
    const bulkAdditionResult = await bulkAddFiles(imagesToUpload);
    images.push(...bulkAdditionResult.paths);
    data.images = images;
    const { error, value } = schema.validate(data);
    if (error) {
      bulkRemoveFiles(images);
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    const newEvent = await Event.create(value);
    setResponseStatus(event, 201);
    return newEvent;
  } catch (err) {
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
