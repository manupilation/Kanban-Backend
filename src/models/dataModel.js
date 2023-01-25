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

    if (data === null) return null;

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
      { $push: { tasks: task } },
      { returnDocument: "after" }
    );

    add.save();

    return add;
  }

  async deleteTask(id, taskId) {
    const del = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { tasks: { _id: taskId } } },
      { returnDocument: "after" }
    );

    del.save();

    return del;
  }

  async updateTask(id, taskUpd, _id) {
    const upd = await User.findOneAndUpdate(
      {"tasks._id": _id},
      {
        $set: {
          "tasks.$.task": taskUpd.task,
          "tasks.$.date": taskUpd.date,
          "tasks.$.status": taskUpd.status,
        }
      }, { returnDocument: "after" }
    );

    upd.save();

    return upd;
  }
}

export default DataModel;
