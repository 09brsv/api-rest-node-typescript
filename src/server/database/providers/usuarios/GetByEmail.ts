import { Knex } from "../../knex";
import { IUser } from "../../models";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex("usuario").where({ email }).first();

    if (result) return result;
    return new Error("usuário e/ou senha incorretos");
  } catch (error) {
    console.log(error);
    return new Error("Error ao logar");
  }
};
