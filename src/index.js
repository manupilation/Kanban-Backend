import App from "./App.js";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.DB_PORT;

const app = new App();
app.start(port);
