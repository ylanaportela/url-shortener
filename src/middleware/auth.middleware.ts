import { Request, Response, NextFunction } from "express";

export function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const userId = req.session.user?.id;

  if(userId){
    next();
    return;
  }
  else{
    res.status(401).send('Unauthorized user');
    return;
  }
};1