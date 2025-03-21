import Joi from "joi";
import { Customer } from "~/server/database/models/Customer";

const schema = Joi.object({
  phone: Joi.string().max(20).required(),
  name: Joi.string().max(256).required(),
  surname: Joi.string().max(256).required(),
  email: Joi.string().max(512).required().email(),
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

    const { phone, name, surname, email } = value;

    let customer = await Customer.findOne({ where: { phone } });

    if (customer) {
      await customer.update({ name, surname, email });
      setResponseStatus(event, 200);
      return { message: "Customer updated successfully.", customer };
    }

    customer = await Customer.create({ phone, name, surname, email });
    setResponseStatus(event, 201);
    return { message: "Customer created successfully.", customer };
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
