import { Request, Response } from 'express';
import { getUser, updateUserName } from './user.service';

export const getUserById = async (req: Request, res: Response) => {
  const id = req.session.user?.id as string;

  const user = await getUser(id); 

  if(!user){
    res.status(404).send('No user was found');
    return;
  }

  res.status(200).send(user);
  return;
}

export const updateUserById = async(req: Request, res: Response) => {
  const id = req.session.user?.id as string;
  const name = req.body.name as string;

  const updateUser = await updateUserName(id, name);

  if(!updateUser){
    res.status(404).send('No user was found');
    return;
  }
  res.status(200).send(updateUser);
  return;
}