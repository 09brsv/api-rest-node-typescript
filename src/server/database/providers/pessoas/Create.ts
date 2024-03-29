import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const create = async (
  pessoa: Omit<IPerson, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", pessoa.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (!count)
      return new Error("A cidade usada no cadastro não foi encontrada");

    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    return new Error("Erro ao cadastrar o registro");
  }
};
