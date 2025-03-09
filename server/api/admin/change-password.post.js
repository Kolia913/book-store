import Joi from "joi";
import { Admin } from "~/server/database/models/Admin";
import { hashPassword } from "~/server/utils/hashPassword";

const schema = Joi.object({
  username: Joi.string().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).max(255).required(),
});

function createInvalidCredentialsErrorJSON() {
  setResponseStatus(event, 401);
  return createError({
    message: "Invalid username or old password",
    statusCode: 401,
    statusMessage: "Unauthorized",
  }).toJSON();
}

function comparePasswords(password, hashedPassword) {
  return hashPassword(password).trim() === hashedPassword.trim();
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { error, value } = schema.validate(body);
    if (error) {
      setResponseStatus(event, 422);
      return createError({
        message: error.details[0].message,
        statusCode: 422,
        statusMessage: "Unprocessable Entity",
      }).toJSON();
    }
    const { username, oldPassword, newPassword } = value;

    const existingAdmin = await Admin.findOne({ where: { username } });

    if (!existingAdmin) {
      return createInvalidCredentialsErrorJSON();
    }

    if (!comparePasswords(oldPassword, existingAdmin.password)) {
      return createInvalidCredentialsErrorJSON();
    }

    await Admin.update(
      { password: hashPassword(newPassword) },
      { where: { username } }
    );

    setResponseStatus(event, 200);
    return { message: "Password changed successfully" };
  } catch (err) {
    const error = createError({
      message: "Something went wrong",
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
    return error.toJSON();
  }
});
