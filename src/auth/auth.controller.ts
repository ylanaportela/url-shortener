import { Request, Response } from "express";
import { findUser, createUser } from "./auth.service";
import bcrypt from "bcrypt";
import { User } from "user/user.model";

export const SignUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
 
  const existingUser: User | undefined = await findUser(email);
  if(existingUser){
    res.status(500).send("Alredy has an account");
    return;
  }

  const cryptPassword = bcrypt.hashSync(password, 10);
  const createdUser = await createUser(email, cryptPassword);

  if (createdUser !== undefined) {
    res.status(201).send("Account created successfully");
  } else {
    res.status(500).send("Something went wrong");
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser: User | undefined = await findUser(email);

  if(!existingUser){
    res.status(404).send("Account not found");
    return;
  }

  const comparePassword = bcrypt.compareSync(password, existingUser.password);

  if(!comparePassword){
    res.status(401).send("Invalid email or password");
    return;
  }

  req.session.user = req.session.user ?? {};
  req.session.user.id = existingUser.id;

  res.send("Login successful");
};
