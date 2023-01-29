class AuthorizationHandler {
  constructor(type="invalid") {
    this.error = new Error();
    this.init(type);
  }

  formatInvalid() {
    this.error.name = "Unauthorized";
    this.error.message = "Token inválido!";
  }

  formatExpired() {
    this.error.name = "Unauthorized";
    this.error.message = "Token expirado!";
  }

  init(type) {
    type === "expired" ? this.formatExpired() : this.formatInvalid();
    throw this.error;
  }
}

export default AuthorizationHandler;
