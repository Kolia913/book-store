import Joi from "joi";
import { Purchase } from "~/server/database/models/Purchase";

const schema = Joi.object({
  is_processed: Joi.boolean(),
});

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id || isNaN(Number(+id))) {
      setResponseStatus(event, 400);
      return createError({
        message: "Invalid purchase ID",
        statusCode: 400,
        statusMessage: "Bad Request",
      }).toJSON();
    }

    const exPurchase = await Purchase.findOne({
      where: { id: +id },
    });
    if (!exPurchase) {
      setResponseStatus(event, 404);
      return createError({
        message: "Purchase not found",
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

    const purchase = await exPurchase.update({
      is_processed: value.is_processed,
    });
    setResponseStatus(event, 201);

    return purchase;
  } catch (err) {
    console.log(err);
    setResponseStatus(event, 500);
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
