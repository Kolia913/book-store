import Joi from "joi";
import { Translation } from "~/server/database/models/Translation";

const schema = Joi.object({
  key: Joi.string().min(3).max(255).required(),
  text_ua: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  try {
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

    const existingTranslation = await Translation.findOne({
      where: { key: value.key },
    });

    if (existingTranslation) {
      setResponseStatus(event, 409);
      return createError({
        message: "key should be unique",
        statusCode: 409,
        statusMessage: "Conflict",
      }).toJSON();
    }

    const newTranslation = await Translation.create(value);
    setResponseStatus(event, 201);
    return newTranslation;
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
