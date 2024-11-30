import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { urlRoute } from "./url/url.routes";

dotenv.config();
const app = express();
app.use(helmet());
app.use(urlRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server ready");
});
