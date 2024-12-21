import { database } from "../db";

export async function findUser (email: string) {
  try{
    const result = await database.query("select * from users where email=$1", [email])
    return result.rows[0];
  }
  catch(error){
    console.error('Something went wrong with the database query', error);
  }
};

export async function createUser (email: string, password: string){
  try {
    await database.query("insert into users (email, password) values ($1, $2)", [email, password]);
    return;
  } catch(error) {
    console.error('Something went wrong with the database insertion', error);
  }
}