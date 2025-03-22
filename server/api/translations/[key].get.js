import { Translation } from "~/server/database/models/Translation";

export default defineEventHandler(async (event) => {
  try {
    const key = getRouterParam(event, "key");
    const page = await Translation.findOne({ where: { key } });

    if (!page) {
      setResponseStatus(event, 404);
      return createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Translation not found",
      }).toJSON();
    }

    setResponseStatus(event, 200);
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
