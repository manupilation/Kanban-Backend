import Joi from "joi";

const userSchema = Joi.object({
  user: Joi.string().min(3).required().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be longer than 2 characters",
    "any.required": "Username is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be longer than 7 characters",
    "any.required": "Password is required",
  }),
  email: Joi.string().required().messages({
    "string.base": "Invalid email",
    "any.required": "Email is required",
  }),
});

export default userSchema;
