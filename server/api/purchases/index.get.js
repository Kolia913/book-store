import { Purchase } from "~/server/database/models/Purchase";
import { Customer } from "~/server/database/models/Customer";

export default defineEventHandler(async (event) => {
  try {
    sequelize.models.forEach((model) => {
      model.associate(sequelize.models);
    });
    const purchases = await Purchase.findAll({
      include: {
        model: Customer,
        required: false,
      },
    });
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
