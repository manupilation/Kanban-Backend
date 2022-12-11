const defineCodeError = (errorName) => {
  switch (errorName) {
  case "any.required":
    return "badRequest";
  default:
    return "invalidInput";
  }
};

const validationSchema = (schema, body) => {
  const { error } = schema.validate(body);
  
  if (error) {
    const newError = new Error();
    newError.name = defineCodeError(error.details[0].type);
    newError.message = error.details[0].message;
    throw newError;
  }
};

export default validationSchema;
