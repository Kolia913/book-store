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
        message: "Book not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }

    try {
      await bulkRemoveFiles(book.images);
    } catch (err) {
      console.error(err);
      const error = createError({
        message: "Error while deleting book images",
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
      return error.toJSON();
    }

    await Book.destroy({
      where: { id },
    });

    setResponseStatus(event, 200);
    return { message: "Book deleted successfully" };
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
