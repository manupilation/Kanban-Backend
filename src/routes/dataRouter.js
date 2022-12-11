import express from "express";
import DataController from "../controllers/dataController.js";

const dataRouter = express.Router();

dataRouter.post("/", new DataController().setUser);
dataRouter.post("/get", new DataController().getData);
dataRouter.post("/login", new DataController().login);
// Esta rota será get, o id será pego pelo token;
// Parece que um id inválido retorna uma promise rejection

export default dataRouter;
