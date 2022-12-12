import express from "express";
import connector from "./database/connection.js";
import dataRouter from "./routes/dataRouter.js";
import bodyParser from "body-parser";
import handlerRouteError from "./controllers/middlewares/erros.js";

class App {
  constructor() {
    this.app = express();
    this.db = connector().catch(err => console.error(err));
    this.app.use(bodyParser.json());
    this.routes();
    this.catchErrors();
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Task scheduler is running on port ${port}`);
    });
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
