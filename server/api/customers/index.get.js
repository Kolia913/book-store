import { Customer } from "~/server/database/models/Customer";

export default defineEventHandler(async (_event) => {
  try {
    const customers = await Customer.findAll();
    return customers;
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
