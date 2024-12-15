import { database } from "../db";

export async function existsUser (email: string) {
  try{
    const result = await database.query("select * from users where email=$1", [email])
    if(result.rows.length > 0){
      return result.rows[0];
    }
    return undefined;
  }
  catch(error){
    console.error('Something went wrong with the database query', error);
  }
};

export async function createUser (email: string, password: string){
  try {
    await database.query("insert into users (email, password) values ($1, $2)", [email, password]);
    return true;
  } catch(error) {
    console.error('Something went wrong with the database insertion', error);
    return false;
  }
}