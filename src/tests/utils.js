import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export function RestartDb() {
  mongoose.connect(process.env.DB_URI, function() {
    mongoose.connection.db.dropDatabase();
  });
}