import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default class JWTMethods {
  static jwtSignature(payload) {
    const sign = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "5h",
      algorithm: "HS256",
    });

    return sign;
  }

  static verifyToken(token) {

    try {
      const verifying = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
      return [true ,verifying];
    } catch(err) {
      if (err.message == "jwt expired") return [null, "expired"];
      return [null, "malformed"];
    }
  }

  static decodeToken(token) {
    const decode = jwt.decode(token);

    return decode;
  }
}
