function authorizationError() {
  const err = new Error();

  err.name = "Unauthorized";
  err.message = "Token inválido!";

  throw err;
}

export {
  authorizationError,
};
