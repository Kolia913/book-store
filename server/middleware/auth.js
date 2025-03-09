import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const SECRET_KEY = config.jwtSecret;
  const { url, method } = event.node.req;

  const protectedRoutes = [
    { route: "/api/translations", methods: ["POST", "PUT", "DELETE"] },
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => url.startsWith(route.route) && route.methods.includes(method)
  );

  if (isProtectedRoute) {
    const token = event.node.req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return createError({
        statusCode: 401,
        message: "Token is required",
        statusMessage: "Unauthorized",
      }).toJSON();
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      event.context.username = decoded;
    } catch (error) {
      return createError({
        statusCode: 401,
        message: "Invalid or expired token",
        statusMessage: "Unauthorized",
      }).toJSON();
    }
  }
});
