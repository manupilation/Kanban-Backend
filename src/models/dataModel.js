import User from "../database/model.js";

class DataModel {
  async setUser({ user, password, email, tasks }) {
    const userData = new User({
      user,
      password,
      email,
      tasks,
    });
    await userData.save();

    return userData;
  }

  async getData(id) {
    const data = await User.findById(id);

    return data;
  }
}

export default DataModel;
