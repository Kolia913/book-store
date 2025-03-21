import { Page } from "~/server/database/models/Page.js";

export default defineEventHandler(async (event) => {
  try {
    const pages = await Page.findAll({
      attributes: ["id", "key", "admin_title", "title"],
    });
    setResponseStatus(event, 200);
    return pages;
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
