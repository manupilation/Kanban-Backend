import DataModel from "../models/dataModel.js";
import BCryptParse from "../utils/password.js";

class DataService {
  async setUser({user, email, password, tasks}) {
    const setData = new DataModel();
    const hashPassword = await BCryptParse.hashPassword(password);
    const data = await setData.setUser({user, email, password: hashPassword, tasks});

    return data;
  }

  async getData(id) {
    const dbdata = new DataModel;
    const data = await dbdata.getData(id);

    return data;
  }
}

export default DataService;
