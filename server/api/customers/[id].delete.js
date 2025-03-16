import { Customer } from "~/server/database/models/Customer";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id || isNaN(Number(+id))) {
      setResponseStatus(event, 400);
      return createError({
        message: "Invalid customer ID",
        statusCode: 400,
        statusMessage: "Bad Request",
      }).toJSON();
    }

    const customer = await Customer.findByPk(+id);

    if (!customer) {
      setResponseStatus(event, 404);
      return createError({
        message: "Customer not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }

    await customer.destroy();

    return { message: "Customer deleted successfully" };
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
