import express from "express";
import helmet from "helmet";
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.use(helmet());

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server ready");
});
