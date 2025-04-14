import { Book } from "~/server/database/models/Book.js";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const whereList = {};

    if (query.is_on_sale) {
      whereList.is_on_sale = query.is_on_sale == "true";
    }

    // if (query.draft) {
    //   whereList.draft = query.draft == "true";
    // } else {
    //   whereList.draft = false;
    // }
    // == should be there 🙂
    const books = await Book.findAll({
      where: whereList,
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
