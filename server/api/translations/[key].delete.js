import { Translation } from "~/server/database/models/Translation";

export default defineEventHandler(async (event) => {
  try {
    const key = getRouterParam(event, "key");

    const existingTranslation = await Translation.findOne({
      where: { key },
    });

    if (!existingTranslation) {
      return createError({
        message: "Translation not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }

    await Translation.destroy({
      where: { key },
    });

    setResponseStatus(event, 200);
    return { message: "Translation deleted successfully" };
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
