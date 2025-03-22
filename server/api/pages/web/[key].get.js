import { Page } from "~/server/database/models/Page";

export default defineEventHandler(async (event) => {
  try {
    const key = getRouterParam(event, "key");
    const page = await Page.findOne({ where: { key } });

    if (!page) {
      setResponseStatus(event, 404);
      return createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Page not found",
      }).toJSON();
    }

    setResponseStatus(event, 200);
    if (typeof page.content === "string") {
      page.content = JSON.parse(page.content);
    }
    return page;
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
