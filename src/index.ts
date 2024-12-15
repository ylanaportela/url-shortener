import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { urlRoute } from "./url/url.route";
import { authRoute } from "./auth/auth.routes";
import { sessionConfig } from "./middleware/session.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(sessionConfig);
app.use(authRoute);
app.use(urlRoute);

app.listen(port, () => {
  console.log("server ready");
});
