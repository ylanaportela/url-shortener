import { Request, Response } from "express";
import { deleteUrlById, findUrl, selectUsersUrls, updateUrl } from "./url.service";
import { createUrl } from "./url.service";

const existUrl = async(id: string) => {
  const url = await findUrl(id);

  return url;
}

export const getUserUrls = async (req: Request, res: Response) => {
  const userId = req.session.user?.id as string;

  const urls = await selectUsersUrls(userId);

  if(!urls){
    res.status(404).send(`No URL was found for the given userId ${userId}`);
    return;
  };
  res.status(200).send(urls);
}

export const getUrl = async (req: Request, res: Response) => {
  const id = req.params.urlId;
  const url = await existUrl(id);

  if(! url){
    res.status(404).send(`No URL was found for the given ID ${id}`);
    return
  }
  res.redirect(url.destination);
  res.status(200);
}

export const createNewUrl = async (req: Request, res: Response) => {
  const { destination }  = req.body;
  const userId = req.session.user?.id as string;

  const createdUrl = await createUrl(destination, userId);

  if(! createdUrl){
    res.status(500).send('Something went wrong with creation url');
    return;
  }
  res.status(201).send(createdUrl);
}

export const updateDestinationUrl = async(req: Request, res: Response) => {
  const id = req.params.urlId as string;
  const url = existUrl(id);

  if(! url){
    res.status(404).send(`No URL was found for the given ID ${id}`);
    return
  }

  const { destination }  = req.body;

  const updatedUrl = await updateUrl(id, destination)

  if(! updatedUrl){
    res.status(500).send('Something went wrong with udpate url');
    return;
  }
  res.status(200).send(updatedUrl);
}

export const deleteUrl = async(req: Request, res: Response) => {
  const urlId = (req.params.urlId)
  const findUrl = await existUrl(req.params.urlId);

  if(! findUrl){
    res.status(404).send("Not found url");  // Early return if findUrl is falsy
    return;
  }

  await deleteUrlById(urlId);
  res.status(200).send('Url delete successfully');
};
