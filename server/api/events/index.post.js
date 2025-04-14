import Joi from "joi";
import { Event } from "~/server/database/models/Event";

const schema = Joi.object({
  title: Joi.string().max(1024).required(),
  description: Joi.string().allow(null, ""),
  tickets_available: Joi.boolean().default(false),
  event_end: Joi.boolean().default(false),

});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); 
    const { value, error } = schema.validate(body);

    if (error) {
      throw createError({
        message: error.details[0].message,
        statusCode: 400,
        statusMessage: "Bad Request",
      });
    }

    const newEvent = await Event.create(value);
    setResponseStatus(event, 201);
    return newEvent;
  } catch (err) {
    setResponseStatus(event, 500);
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
