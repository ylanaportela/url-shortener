import { Request, Response } from "express";
import { existsUser, createUser } from "./auth.service";
import bcrypt from "bcrypt";

interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
}

export const SingUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email &&
    typeof email === "string" &&
    password &&
    typeof password === "string"
  ) {
    const result: User | undefined = await existsUser(email);

    if (!result) {
      const cryptPassword = bcrypt.hashSync(password, 10);
      const createdUser = await createUser(email, cryptPassword);

      if (createdUser) {
        res.status(201).send("Account created successfully");
        return;
      } else {
        res.status(500).send("Something went wrong");
        return;
      }
    } 
    res.status(500).send("Alredy has an account");
  } else {
    res.status(500).send("Invalid email or password format");
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && typeof email === "string" && password &&  typeof password === "string") {
    const result: User | undefined = await existsUser(email);
    if (result) {
      const comparePassword = bcrypt.compareSync(password, result.password);

      if (comparePassword) {
        req.session.userId = result.id;
        req.session.email = result.email;
        res.send("Login successful");
        return;

      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(404).send("Account not found");
    }
  } else {
    res.status(500).send("Invalid email or password format");
  }
};
