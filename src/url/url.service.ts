import { database } from "../db";
import { Url } from "./url.model";
import { nanoid } from "nanoid";

export async function findUrl (urlId: string): Promise<Url | undefined>{
  try {
    const result = (await database.query("select * from urls where id=$1", [urlId]));
    return result.rows[0];
  } catch(error) {
    console.error('Something went wrong with the database query', error);
  }
}

export async function createUrl (destination: string, userId: string){
  const id = nanoid(8);
  try {
    const result = await database.query("insert into urls (id, destination, user_id) values ($1, $2, $3) returning *", [id, destination, userId]);
    console.log(result.rows[0]);
    return result.rows[0];
  } catch(error) {
    console.error('Something went wrong with the database insertion', error);
    return;
  }
}