import { Request } from "express";

export{};

declare module 'express-session' {
  export interface SessionData {
    // user: {
    //   id: string;
    //   email: string
    // }
    userId: string;
    email: string
  }
}