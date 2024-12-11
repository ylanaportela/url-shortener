import express, { Request, Response } from "express";
import { findUrl } from "./url.service";

export const urlRoute = express.Router();

urlRoute.get("/:urlId", async (req: Request, res: Response) => {
  const id = req.params.urlId;

  const result = await findUrl(id);

  if(result){
    res.redirect(result.destination);
    return;
  }
  else{
    res.status(404).send(`No URL was found for the given ID ${id}`);
  }
});
