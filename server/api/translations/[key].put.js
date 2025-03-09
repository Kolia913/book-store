import Joi from "joi";
import { Translation } from "~/server/database/models/Translation";

const schema = Joi.object({
  text_ua: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  try {
    const key = getRouterParam(event, "key");
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
      where: { key },
    });

    if (!existingTranslation) {
      setResponseStatus(event, 404);
      return createError({
        message: "Translation not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }

    await Translation.update(value, {
      where: { key },
    });

    const updatedTranslation = await Translation.findOne({ where: { key } });
    setResponseStatus(event, 200);
    return updatedTranslation;
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
