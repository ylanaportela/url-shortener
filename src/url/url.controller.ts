import { Request, Response } from "express";
import { findUrl } from "./url.service";
import { nanoid } from "nanoid";
import { insertUrl } from "./url.service";
import { UrlRequestBody } from "./url.model";

export const getUrl = async (req: Request, res: Response) => {
  const id = req.params.urlId;
  const result = await findUrl(id);

  if(result){
    res.redirect(result.destination);
    return;
  }
  else{
    res.status(404).send(`No URL was found for the given ID ${id}`);
    return;
  }
}

export const createNewUrl = async (req: Request, res: Response) => {
  const {destination}: UrlRequestBody  = req.body;

  const id = nanoid(8);

  if( destination && typeof destination === 'string' && req.session.userId){
    const createdUrl = await insertUrl(id, destination, req.session.userId);
    if(createdUrl)   {
      res.status(201).send({
        id: id,
        destination: destination,
        email: (req.session as any).email
      });
    } 
    else{
      res.status(500).send('Something went wrong with creation url');
    }
  }
  else{
    res.status(500).send('Something went wrong with destination input');
  }
}