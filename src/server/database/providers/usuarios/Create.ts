import { Knex } from "../../knex";
import { IUser } from "../../models/Usuario";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex("usuario").insert(user).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao inserir o usuário");
  }
};
