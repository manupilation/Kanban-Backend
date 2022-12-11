import DataModel from "../models/dataModel.js";
import BCryptParse from "../utils/password.js";
import validationSchema from "../controllers/joi/validateSchema.js";
import userSchema from "../controllers/joi/dataUser.js";
import { loginErrorPassword } from "../utils/loginError.js";
import JWTMethods from "../utils/jwt.js";

class DataService {
  async setUser({user, email, password, tasks}) {
    const setData = new DataModel();
    const hashPassword = await BCryptParse.hashPassword(password);

    try {
      validationSchema(userSchema, {user, email, password});
      const data = await setData.setUser({user, email, password: hashPassword, tasks});

      return data;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async getData(token) {
    const dbdata = new DataModel();
    const decodeToken = JWTMethods.decodeToken(token);
    const data = await dbdata.getData(decodeToken.id);

    return data;
  }

  async login({ password, email }) {
    try {
      const acessDb = new DataModel();
      const { password: dbPass, email: dbEmail, user, id } = await acessDb.login(email);
      const compare = await BCryptParse.comparePassword(password, dbPass);

      if(compare == false) {
        loginErrorPassword();
      }

      const token = JWTMethods.jwtSignature({id, user, email: dbEmail});

      return token;

    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  async addTask(token, body) {
    const connectDb = new DataModel();
    const decodeToken = JWTMethods.decodeToken(token);
    const add = connectDb.addTask(decodeToken.id, body);

    return add;
  }
}

export default DataService;
