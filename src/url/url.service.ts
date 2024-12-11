import { database } from "../db";
import { Url } from "./url.model";

export async function findUrl (urlId: string): Promise<Url | null>{
  try {
    const result: Url = (await database.query("select * from urls where id=$1", [urlId])).rows[0];
    return result;
  } catch(error) {
    console.error('Something went wrong with the database search', error);
    return null;
  }
}