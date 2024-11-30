import express from "express";
import helmet from "helmet";
import dotenv from "dotenv"
import { database } from "./db";

dotenv.config();
const app = express();

app.use(helmet());

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server ready");
});

database.query('insert into users(name, email, second_email) values($1, $2, $2)', ['Mohamed', 'test@gmail.com']).then(()=> {
  database.query("select * from users")
  .then((data) => {
    console.log(data.rows)
  });
})
