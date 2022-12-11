import DataService from "../services/dataService.js";
import { authorizationError } from "../utils/authError.js";

class DataController {
  async setUser(req, res, next) {
    try {
      const { user, email, password, tasks = [] } = req.body;
      const setData = new DataService();
  
      const final = await setData.setUser({ user, email, password, tasks });
  
      res.status(201).json(final);
    } catch(err) {
      next(err);
    }
  }


  async getData(req, res, next) {
    try {
      const authToken = req.headers.authorization;
      if(!authToken) {
        authorizationError();
      }
  
      const dbdata = await new DataService().getData(authToken);
  
      res.status(200).json(dbdata);
    } catch(err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const connect = await new DataService().login(req.body);

      res.status(200).json({ token: connect });
    } catch(err) {
      next(err);
    }
  }

  async addTask(req, res) {
    const { authorization } = req.headers;
    const connectDb = new DataService();
    const add = connectDb.addTask(authorization, req.body);

    res.status(201).json(add);
  }
}

export default DataController;
