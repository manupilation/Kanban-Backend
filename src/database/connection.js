import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

async function connector() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_URI, err => err ? console.error(err) : console.log("Rodando db!"));
}

export default connector;
