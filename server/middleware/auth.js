import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const SECRET_KEY = config.jwtSecret;
  const { url, method } = event.node.req;

  const protectedRoutes = [
    { route: "/api/translations", methods: ["POST", "PUT", "DELETE"] },
    { route: "/api/admin/change-password", methods: ["POST"] },
    { route: "/api/books", methods: ["POST", "PUT", "DELETE"] },
    { route: "/api/pages", methods: ["POST", "PUT"] },
    { route: "/api/customers", methods: ["GET", "DELETE"] },
    { route: "/api/purchases", methods: ["GET"] },
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => url.startsWith(route.route) && route.methods.includes(method)
  );

  if (isProtectedRoute) {
    const token = event.node.req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      setResponseStatus(event, 401);
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
