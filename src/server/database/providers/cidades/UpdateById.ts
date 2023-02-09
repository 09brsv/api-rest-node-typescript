import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (
  id: number,
  cidade: Omit<ICidade, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where("id", "=", id);

    if (result > 0) return;
    return new Error("Erro ao atualizar");
  } catch (error) {
    console.error(error);

    return new Error("Erro ao atualizar");
  }
};
