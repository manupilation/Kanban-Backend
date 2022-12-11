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

    if(data) return {
      user: data.user,
      id: data._id.toString(),
      tasks: data.tasks,
    };

    return null;
  }

  async login(email) {
    const data = await User.findOne({ email });

    return {
      user: data.user,
      id: data._id.toString(),
      email: data.email,
      password: data.password,
    };
  }

  async addTask(id, task) {
    const add = await User.findOneAndUpdate(
      { _id: id },
      { $push: { tasks: task} },
    );

    add.save();

    return add;
  }
}

export default DataModel;
