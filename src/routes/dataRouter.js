import express from "express";
import DataController from "../controllers/dataController.js";

const dataRouter = express.Router();

dataRouter.get("/get", new DataController().getData);
dataRouter.post("/login", new DataController().login);
dataRouter.post("/register", new DataController().setUser);
dataRouter.put("/setTask", new DataController().addTask);
dataRouter.put("/updateTask", new DataController().updateTask);
dataRouter.delete("/delTask", new DataController().deleteTask);

export default dataRouter;
