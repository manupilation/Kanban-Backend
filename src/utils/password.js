import { hash, compare} from "bcryptjs";

export default class BCryptParse {
  static async hashPassword(pass) {
    const encryptedPass = await hash(pass, 10);

    return encryptedPass;
  }

  static async comparePassword(pass, hashedPass) {
    const comparingPassword = await compare(pass, hashedPass);

    return comparingPassword;
  }
}
