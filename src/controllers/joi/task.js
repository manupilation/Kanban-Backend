import Joi from "joi";

const taskSchema = Joi.object({
  task: Joi.string().min(6).required().messages({
    "string.base": "Task must be a string",
    "string.min": "Task must be longer than 5 characters",
    "any.required": "Task is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Invalid date format",
    "any.required": "Date is required",
    "date.format": "Date format is YYYY-MM-DD"
  }),
  status: Joi.string().required().messages({
    "string.base": "Status must be a string",
    "any.required": "Status is required",
  })
});

export default taskSchema;
