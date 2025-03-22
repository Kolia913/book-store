import { Purchase } from "~/server/database/models/Purchase";

export default defineEventHandler(async (event) => {
  try {
    const purchases = await Purchase.findAll({});
    return purchases.map((item) => ({
      ...item.dataValues,
      cart_data:
        typeof item.cart_data === "string"
          ? JSON.parse(item.cart_data)
          : item.cart_data,
      delivery_data:
        typeof item.delivery_data === "string"
          ? JSON.parse(item.delivery_data)
          : item.delivery_data,
    }));
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
