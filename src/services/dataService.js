import DataModel from "../models/dataModel.js";

class DataService {
  async setUser(userdata) {
    const setData = new DataModel();
    const data = await setData.setUser(userdata);

    return data;
  }

  async getData(id) {
    const dbdata = new DataModel;
    const data = await dbdata.getData(id);

    return data;
  }
}

export default DataService;
