import { Knex } from "../../knex"

export const getEmail = async (email: string) => {
  try {
    const result = await Knex("usuario").where({email}).first();
  
    if (result) return;
    return new Error("usuário e/ou senha incorretos")
  } catch (error) {
    console.log(error);
    return new Error("Error ao logar")    
  }
}