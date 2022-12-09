import mongoose from "mongoose";
const { Schema } = mongoose;


const userData = new Schema({
  user: String,
  password: String,
  email: String,
  tasks: [{
    task: String,
    date: { type: Date, default: Date.now },
    status: String,
  }],
});

const User = mongoose.model("userCollection", userData);

export default User;
