import express from 'express';
import { getUrl, createNewUrl } from './url.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const urlRoute = express.Router();

urlRoute.get("/:urlId", getUrl);

urlRoute.post("/urls", [authMiddleware], createNewUrl);