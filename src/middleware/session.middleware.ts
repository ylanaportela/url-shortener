import session from 'express-session';
import { database } from "../db";

if(! process.env.COOKIE_SECRET_KEY){
  throw Error('Cookie session not found')
}

export const sessionConfig = session({
  store: new (require('connect-pg-simple')(session))({
    pool: database,
    tableName: 'users_session',
    createTableIfMissing: true,
  }),
  secret: process.env.COOKIE_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
})