import express from "express";
import connector from "./database/connection.js";
import dataRouter from "./routes/dataRouter.js";
import bodyParser from "body-parser";
import handlerRouteError from "./controllers/middlewares/erros.js";
import cors from "cors";

class App {
  constructor() {
    this.app = express();
    this.config();
    this.db = connector().catch(err => console.error(err));
    this.routes();
    this.catchErrors();
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Task scheduler is running on port ${port}`);
    });
  }

  config() {
    const acessControl = (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(acessControl);
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/", dataRouter);
  }

  catchErrors() {
    this.app.use(handlerRouteError);
  }
}

export default App;

export const { app } = new App();
