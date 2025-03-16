import Joi from "joi";
import { Purchase } from "~/server/database/models/Purchase";
import { Book } from "~/server/database/models/Book";

const schema = Joi.object({
  payment_type: Joi.string().max(100).required(),
  payment_details: Joi.string().optional(),
  delivery_data: Joi.object().default({}),
  total: Joi.number().precision(2).required(),
  cart_data: Joi.array()
    .items(
      Joi.object({
        book_id: Joi.number().integer().required(),
        qty: Joi.number().integer().required(),
      })
    )
    .required(),
  customer_id: Joi.number().integer().required(),
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

    value.delivery_data = JSON.stringify(value.delivery_data);

    value.cart_data = await enrichCartData(value.cart_data);

    const purchase = await Purchase.create(value);
    setResponseStatus(event, 201);

    purchase.delivery_data = JSON.parse(purchase.delivery_data);
    purchase.cart_data = JSON.parse(purchase.cart_data);

    return purchase;
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});

async function enrichCartData(cartData) {
  const enrichedCartData = [];

  for (const item of cartData) {
    const book = await Book.findByPk(item.book_id);
    if (book) {
      enrichedCartData.push({
        book: book.toJSON(),
        qty: item.qty,
      });
    } else {
      enrichedCartData.push({
        book: null,
        qty: item.qty,
      });
    }
  }

  return JSON.stringify(enrichedCartData);
}
