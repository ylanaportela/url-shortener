import { database } from "../db";
import { Url } from "./url.model";

export async function findUrl (urlId: string): Promise<Url | null>{
  try {
    const result: Url = (await database.query("select * from urls where id=$1", [urlId])).rows[0];
    return result;
  } catch(error) {
    console.error('Something went wrong with the database query', error);
    return null;
  }
}

export async function insertUrl (id: string, destination: string, userId: string){
  try {
    await database.query("insert into urls (id, destination, user_id) values ($1, $2, $3)", [id, destination, userId]);
    return true;
  } catch(error) {
    console.error('Something went wrong with the database insertion', error);
    return false;
  }
}