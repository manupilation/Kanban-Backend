import express from "express";
import connector from "./database/connection.js";
import dataRouter from "./routes/dataRouter.js";
import bodyParser from "body-parser";

class App {
  constructor() {
    this.app = express();
    this.db = connector().catch(err => console.error(err));
    this.app.use(bodyParser.json());
    this.routes();
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Task scheduler is running on port ${port}`);
    });
  }

  routes() {
    this.app.use("", dataRouter);
  }
}

export default App;
