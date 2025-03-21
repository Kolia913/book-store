import { Book } from "~/server/database/models/Book";

export default defineEventHandler(async (event) => {
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
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Book not found",
      }).toJSON();
    }
    setResponseStatus(event, 200);
    return book;
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
