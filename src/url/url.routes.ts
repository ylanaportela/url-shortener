import { database } from "../db";
import express, { Request, Response } from "express";
import { Url } from "./url.mode";

export const urlRoute = express.Router();

urlRoute.get("/urls/:urlId", async (req: Request, res: Response) => {
  const id = parseInt(req.params.urlId);

  try {
    const result: Url[] = (await database.query("select * from urls where id=$1", [id])).rows;

    if (result.length) {
      res.redirect(result[0].destination);
      return;
    }
    res.send("No data found in database");
  } catch {
    res.status(500).send("Something went wrong");
  }
});
