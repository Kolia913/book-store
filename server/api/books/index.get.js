import { Book } from "~/server/database/models/Book.js";
export default defineEventHandler(async (event) => {
  try {
    const books = await Book.findAll();
    setResponseStatus(event, 200);
    return books;
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
