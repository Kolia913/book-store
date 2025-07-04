import Joi from "joi";
import { Book } from "~/server/database/models/Book";
import { replaceFiles } from "~/server/utils/fileStorage";

const schema = Joi.object({
  author: Joi.string().max(512).optional(),
  title: Joi.string().max(1024).optional(),
  draft: Joi.boolean().default(false).optional(),
  page_desc_caption: Joi.string().allow(null, "").optional(),
  description: Joi.string().allow(null, "").optional(),
  is_available: Joi.boolean().default(false).optional(),
  is_on_sale: Joi.boolean().default(false).optional(),
  price: Joi.number().optional(),
  price_with_signature: Joi.number().optional(),
  discount_price: Joi.number().allow(null).optional(),
  discount_price_with_signature: Joi.number().allow(null).optional(),
  images: Joi.array().max(20).optional(),
  feedback_images: Joi.array().allow(null).optional(),
  is_feedback_shown: Joi.boolean().default(false).optional(),
});

export default defineEventHandler(async (event) => {
  let images = [];
  try {
    const id = getRouterParam(event, "id");
    if (!Number.isInteger(+id)) {
      setResponseStatus(event, 400);
      return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid book id",
      }).toJSON();
    }

    const book = await Book.findByPk(parseInt(id));
    if (!book) {
      setResponseStatus(event, 404);
      return createError({
        message: "Book not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }
    const body = await readMultipartFormData(event);
    const imagesToUpload = [];
    const feedbackImagesToUpload = [];
    const data = {};
    if (body) {
      for (const item of body) {
        if (item.name === "images") {
          imagesToUpload.push(item);
        } else if (item.name === "feedback_images") {
          feedbackImagesToUpload.push(item);
        } else {
          data[item.name] = item.data.toString();
        }
      }
    }

    const oldImages =
      book.images === null ? [] : book.images.filter((img) => !!img);
    const oldFeedbackImages =
      book.feedback_images === null
        ? []
        : book.feedback_images.filter((img) => !!img);

    if (imagesToUpload?.length) {
      const bulkAdditionResult = await replaceFiles(oldImages, imagesToUpload);
      images = bulkAdditionResult.paths;
    }
    if (images.length) {
      data.images = images;
    } else {
      data.images = book.images;
    }

    let feedback_images = [];
    if (feedbackImagesToUpload?.length) {
      const feedbackBulkAdditionResult = await replaceFiles(
        oldFeedbackImages,
        feedbackImagesToUpload
      );
      feedback_images = feedbackBulkAdditionResult.paths;
    }
    if (feedback_images.length) {
      data.feedback_images = feedback_images;
    } else {
      data.feedback_images = book.feedback_images;
    }

    const { error, value } = schema.validate(data);
    if (error) {
      imagesToUpload?.length && bulkRemoveFiles(images);
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    await book.update(value);

    setResponseStatus(event, 200);
    return book;
  } catch (err) {
    console.log(err);
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
