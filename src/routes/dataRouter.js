import express from "express";
import DataController from "../controllers/dataController.js";

const dataRouter = express.Router();

dataRouter.post("/", new DataController().setUser);

export default dataRouter;
