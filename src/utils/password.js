import bcrypt from "bcryptjs";

export default class BCryptParse {
  static async hashPassword(pass) {
    const encryptedPass = await bcrypt.hash(pass, 10);

    return encryptedPass;
  }

  static async comparePassword(pass, hashedPass) {
    const comparingPassword = await bcrypt.compare(pass, hashedPass);

    return comparingPassword;
  }
}
