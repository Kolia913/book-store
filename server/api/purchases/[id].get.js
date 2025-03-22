import { Purchase } from "~/server/database/models/Purchase";
import { Customer } from "~/server/database/models/Customer";

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

    const purchase = await Purchase.findOne({
      where: { id: +id },
    });

    const customer = await Customer.findOne({
      where: { id: purchase.customer_id },
    });

    if (!purchase) {
      setResponseStatus(event, 404);
      return createError({
        message: "Purchase not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }

    return {
      ...purchase.dataValues,
      customer: customer
        ? {
            ...customer.dataValues,
          }
        : null,
      cart_data: JSON.parse(purchase.cart_data),
      delivery_data: JSON.parse(purchase.delivery_data),
    };
  } catch (err) {
    console.log("err", err);
    setResponseStatus(event, 500);
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
