import Joi from "joi";
import { Book } from "~/server/database/models/Book";
import { bulkAddFiles } from "~/server/utils/fileStorage";

const schema = Joi.object({
  author: Joi.string().max(512).required(),
  title: Joi.string().max(1024).required(),
  draft: Joi.boolean().default(false).required(),
  page_desc_caption: Joi.string().allow(null, ""),
  description: Joi.string().allow(null, ""),
  is_available: Joi.boolean().default(false),
  is_on_sale: Joi.boolean().default(false),
  price: Joi.number().required(),
  price_with_signature: Joi.number().required(),
  discount_price: Joi.number().allow(null).optional(),
  discount_price_with_signature: Joi.number().allow(null).optional(),
  images: Joi.array().max(4).default([]),
});

export default defineEventHandler(async (event) => {
  const images = [];
  try {
    const imagesToUpload = [];
    const body = await readMultipartFormData(event);
    const data = {};
    for (const item of body) {
      if (item.name === "images") {
        imagesToUpload.push(item);
      } else {
        data[item.name] = item.data.toString();
      }
    }
    const bulkAdditionResult = await bulkAddFiles(imagesToUpload);
    images.push(...bulkAdditionResult.paths);
    data.images = images;
    const { error, value } = schema.validate(data);
    if (error) {
      bulkRemoveFiles(images);
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
    setResponseStatus(event, 500);
    bulkRemoveFiles(images);
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
