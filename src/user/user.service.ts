import { database } from "../db";

export async function getUser(id: string){
  try{
    const result = await database.query("select * from users where id=$1", [id]);
    return result.rows[0];
  }
  catch(error){
    console.error('Something went wrong with the database query', error);
  }
};

export async function updateUserName(id: string, name: string){
  try{
    const result = await database.query("update users set name=($1) where id=($2) returning *", [name, id]);
    return result.rows[0];
  }
  catch(error){                                                                       
    console.error('Something went wrong with the database update', error);
  }
};