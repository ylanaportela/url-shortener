import { Router } from "express";
import { Login, SignUp } from "./auth.controller";

export const authRoute = Router();

authRoute.post("/sign-up", SignUp);

authRoute.post("/login", Login);
