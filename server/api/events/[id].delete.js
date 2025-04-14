import { Event } from "~/server/database/models/Event";

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

    const events = await Event.findByPk(parseInt(id));
    if (!events) {
      setResponseStatus(event, 404);
      return createError({
        message: "Event not found",
        statusCode: 404,
        statusMessage: "Not Found",
      }).toJSON();
    }
    await Event.destroy({
      where: { id },
    });

    setResponseStatus(event, 200);
    return { message: "Event deleted successfully" };
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
