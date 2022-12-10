import express from "express";
import connector from "./database/connection.js";

class App {
  constructor() {
    this.app = express();
    this.db = connector().catch(err => console.error(err));
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Task scheduler is running on port ${port}`);
    });
  }
}

export default App;
