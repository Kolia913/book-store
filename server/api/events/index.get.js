import { Event } from "~/server/database/models/Event";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const events = await Event.findAll();
    setResponseStatus(event, 200);
    return events;
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
