import Joi from "joi";
import { Book } from "~/server/database/models/Book";
import { bulkAddFiles } from "~/server/utils/fileStorage";

const schema = Joi.object({
  author: Joi.string().max(512).required(),
  title: Joi.string().max(1024).required(),
  page_desc_caption: Joi.string().allow(null, ""),
  description: Joi.string().allow(null, ""),
  is_available: Joi.boolean().default(false),
  is_on_sale: Joi.boolean().default(false),
  price: Joi.number().required(),
  price_with_signature: Joi.number().required(),
  discount_price: Joi.number().allow(null),
  discount_price_with_signature: Joi.number().allow(null),
  images: Joi.array().max(4).items(Joi.string()).default([]),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);
    const images = [];
    const data = {};
    for (const item of body) {
      if (item.name === "images") {
        const bulkAdditionResult = await bulkAddFiles(
          Array.isArray(item) ? item : [item]
        );
        images.push(...bulkAdditionResult.paths);
      } else {
        data[item.name] = item.data.toString();
      }
    }
    data.images = images;
    const { error, value } = schema.validate(data);
    if (error) {
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    const newBook = await Book.create(value);
    setResponseStatus(event, 201);
    return newBook;
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
