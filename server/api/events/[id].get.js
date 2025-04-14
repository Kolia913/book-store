import { Event } from "~/server/database/models/Event";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!Number.isInteger(+id)) {
      setResponseStatus(event, 400);
      return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid event id",
      }).toJSON();
    }

    const events = await Event.findByPk(parseInt(id));

    if (!events) {
      setResponseStatus(event, 404);
      return createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Event not found",
      }).toJSON();
    }
    setResponseStatus(event, 200);
    return events;
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
