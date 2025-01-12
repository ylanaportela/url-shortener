import { Router } from "express";
import { Login, Logout, SignUp } from "./auth.controller";
import { validateBody } from "../middleware/validator.middleware";
import { authSchema } from "./auth.dto";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRoute = Router();

authRoute.post("/sign-up",[validateBody(authSchema)], SignUp);

authRoute.post("/login", [validateBody(authSchema)], Login);

authRoute.post("/logout", [authMiddleware], Logout);
