import DataService from "../services/dataService.js";

class DataController {
  async setUser(req, res) {
    const { user, email, password, tasks } = req.body;
    const setData = new DataService();

    const final = await setData.setUser({ user, email, password, tasks });

    res.status(201).json(final);
  }
}

export default DataController;
