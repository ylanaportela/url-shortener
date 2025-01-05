import { Router } from "express";
import { Login, SignUp } from "./auth.controller";
import { validateBody } from "../middleware/validator.middleware";
import { authSchema } from "./auth.dto";

export const authRoute = Router();

authRoute.post("/sign-up",[validateBody(authSchema)], SignUp);

authRoute.post("/login", [validateBody(authSchema)], Login);
