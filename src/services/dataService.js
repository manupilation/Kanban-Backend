import DataModel from "../models/dataModel.js";

class DataService {
  async setUser(userdata) {
    const setData = new DataModel();
    const data = await setData.setUser(userdata);

    return data;
  }
}

export default DataService;
