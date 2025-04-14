import Joi from "joi";
import { Event } from "~/server/database/models/Event";
import { replaceFiles } from "~/server/utils/fileStorage";

const schema = Joi.object({
  title: Joi.string().max(1024).optional(),
  description: Joi.string().allow(null, "").optional(),
  tickets_available: Joi.boolean().default(false).optional(),
  event_end: Joi.boolean().default(false).optional(),
 
});

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!Number.isInteger(+id)) {
      setResponseStatus(event, 400);
      return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid book id",
      }).toJSON();
    }

    const events = await Event.findByPk(parseInt(id));
    if (!events) {
      setResponseStatus(event, 404);
      return createError({
        message: "Book not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }
    const body = await readBody(event);
    const { error, value } = schema.validate(body);
    if (error) {
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
