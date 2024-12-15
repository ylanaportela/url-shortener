import { Request } from "express";

export{};

declare module 'express-session' {
  export interface SessionData {
    userId: string;
    email: string
  }
}