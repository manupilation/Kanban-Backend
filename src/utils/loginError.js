function loginErrorPassword() {
  const err = new Error();

  err.name = "Unauthorized";
  err.message = "Email ou senha inválidos!";

  throw err;
}

export {
  loginErrorPassword,
};
