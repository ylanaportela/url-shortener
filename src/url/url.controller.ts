import { Request, Response } from "express";
import { findUrl } from "./url.service";
import { createUrl } from "./url.service";

export const getUrl = async (req: Request, res: Response) => {
  const id = req.params.urlId;
  const existingId = await findUrl(id);

  if(! existingId){
    res.status(404).send(`No URL was found for the given ID ${id}`);
    return
  }
  res.redirect(existingId.destination);
}

export const createNewUrl = async (req: Request, res: Response) => {
  const { destination }  = req.body;
  const storagedId = req.session.user?.id as string;

  if(! destination || typeof destination !== 'string'){
    res.status(500).send('Something went wrong with destination input');
  }

  const createdUrl = await createUrl(destination, storagedId);

  if(! createdUrl){
    res.status(500).send('Something went wrong with creation url');
  }
  else{
    res.status(201).send(createdUrl);
  }
}