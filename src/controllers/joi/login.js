import Joi from "joi";

const loginSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be longer than 7 characters",
    "any.required": "Password is required",
  }),
  email: Joi.string().required().email({
    maxDomainSegments: 3, tlds: { allow: ["com", "net", "org"] }
  }).messages({
    "string.email": "Invalid email",
    "string.base": "Invalid email",
    "any.required": "Email is required",
  }),
});

export default loginSchema;
