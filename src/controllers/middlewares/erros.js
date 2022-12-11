import Joi from "joi";

function defineErrorStatus(name) {
  switch (name) {
  case "badRequest":
    return 400;
  case "Unauthorized":
    return 401;
  case "invalidInput":
    return 422;
  default:
    return 500;
  }
}

function handlerRouteError(err, _req, res, next) {

  if(Joi.isError(err)) {
    next(err);
  }

  const status = defineErrorStatus(err.name);

  res.status(status).json({ error: err.message });
}

export default handlerRouteError;
