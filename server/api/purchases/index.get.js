import { Purchase } from "~/server/database/models/Purchase";
import { Customer } from "~/server/database/models/Customer";

export default defineEventHandler(async (event) => {
  try {
    const purchases = await Purchase.findAll({ include: [Customer] });
    return purchases.map((item) => ({
      ...item.dataValues,
      cart_data: JSON.parse(item.cart_data),
      delivery_data: JSON.parse(item.delivery_data),
    }));
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
