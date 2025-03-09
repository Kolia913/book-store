import Joi from "joi";
import jwt from "jsonwebtoken";

import { Admin } from "~/server/database/models/Admin";
import { hashPassword } from "~/server/utils/hashPassword";

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

function createInvalidCredentialsErrorJSON() {
  return createError({
    message: "Invalid login or password",
    statusCode: 401,
    statusMessage: "Unauthorized",
  }).toJSON();
}

function comparePasswords(password, hashedPassword) {
  return hashPassword(password).trim() === hashedPassword.trim();
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const body = await readBody(event);
    const { error, value } = schema.validate(body);
    if (error) {
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    const { username, password } = value;

    const existingAdmin = await Admin.findOne({ where: { username } });

    if (!existingAdmin) {
      return createInvalidCredentialsErrorJSON();
    }

    if (!comparePasswords(password, existingAdmin.password)) {
      return createInvalidCredentialsErrorJSON();
    }

    const token = jwt.sign({ username }, config.jwtSecret, {
      expiresIn: "30d",
    });

    setResponseStatus(event, 200);
    return { access_token: token };
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
