import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserById, updateUserById } from "./user.controller";
import { validateBody } from "../middleware/validator.middleware";
import { userSchema } from "./user.dto";

export const userRoute = express.Router();

userRoute.get('/profile', [authMiddleware], getUserById)
userRoute.patch('/profile', [authMiddleware, validateBody(userSchema)], updateUserById)