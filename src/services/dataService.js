import DataModel from "../models/dataModel.js";
import BCryptParse from "../utils/password.js";
import validationSchema from "../controllers/joi/validateSchema.js";
import userSchema from "../controllers/joi/dataUser.js";
import { loginErrorPassword } from "../utils/loginError.js";
import JWTMethods from "../utils/jwt.js";
import taskSchema from "../controllers/joi/task.js";
import loginSchema from "../controllers/joi/login.js";
import AuthorizationHandler from "../utils/authorizationErrors.js";

class DataService {
  async setUser({user, email, password, tasks}) {
    const setData = new DataModel();
    
    try {
      validationSchema(userSchema, {user, email, password});
      const hashPassword = await BCryptParse.hashPassword(password);
      const data = await setData.setUser({user, email, password: hashPassword, tasks});

      return data;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }

  async getData(token) {
    const dbdata = new DataModel();
    const verifyToken = JWTMethods.verifyToken(token);

    if (!verifyToken[0]) {
      throw new AuthorizationHandler(verifyToken[1]);
    }

    const decodeToken = JWTMethods.decodeToken(token);
    const data = await dbdata.getData(decodeToken.id);
    return data;
  }

  async login({ password, email }) {
    try {
      validationSchema(loginSchema, { email, password });
      const acessDb = new DataModel();
      const tryLogin = await acessDb.login(email);
      if(tryLogin === null) {
        loginErrorPassword();
      }

      const { password: dbPass, email: dbEmail, user, id } = tryLogin;
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
    try {
      validationSchema(taskSchema, body);
      const verifyToken = JWTMethods.verifyToken(token);

      if (!verifyToken[0]) {
        throw new AuthorizationHandler(verifyToken[1]);
      }
      const add = await connectDb.addTask(decodeToken.id, body);

      return add;
    } catch(err) {
      console.log(err);
      throw err;
    }
  }

  async deleteTask(token, taskId) {
    const connectDb = new DataModel();
    const decodeToken = JWTMethods.decodeToken(token);
    const remove = await connectDb.deleteTask(decodeToken.id, taskId);

    return remove;
  }

  async updateTask(token, { task, date, status, _id}) {
    const connectDb = new DataModel();
    const decodeToken = JWTMethods.decodeToken(token);

    const remove = await connectDb.updateTask(decodeToken.id, {task, date, status}, _id);

    return remove;
  }
}

export default DataService;
