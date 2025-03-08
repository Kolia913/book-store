import { Translation } from "~/server/database/models/Translation.js";
export default defineEventHandler(async (event) => {
  try {
    console.log("Get translations");
    const translations = await Translation.findAll({
      attributes: ["key", "text_ua"],
    });
    setResponseStatus(event, 200);
    return Object.fromEntries(
      translations.map((item) => [item.key, item.text_ua])
    );
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
