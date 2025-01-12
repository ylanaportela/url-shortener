import express from 'express';
import { getUrl, createNewUrl, updateDestinationUrl, deleteUrl, getUserUrls } from './url.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validator.middleware';
import { urlSchema } from './url.dto';

export const urlRoute = express.Router();

urlRoute.get("/urls", [authMiddleware], getUserUrls);

urlRoute.get("/:urlId", getUrl);

urlRoute.post("/urls", [authMiddleware, validateBody(urlSchema)], createNewUrl);

urlRoute.patch("/urls/:urlId", [authMiddleware, validateBody(urlSchema)], updateDestinationUrl);

urlRoute.delete("/urls/:urlId", [authMiddleware], deleteUrl);