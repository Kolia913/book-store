import { Book } from "~/server/database/models/Book.js";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    // == should be there :)
    const books = await Book.findAll({
      where: { draft: query.draft == "true" },
    });
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
