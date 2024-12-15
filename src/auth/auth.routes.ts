import { Router } from "express";
import { Login, SingUp } from "./auth.controller";

export const authRoute = Router();

authRoute.post("/sing-up", SingUp);

authRoute.post("/login", Login);
