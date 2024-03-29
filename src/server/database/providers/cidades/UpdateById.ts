import { ETableNames } from "../../ETableNames";
import { ICity } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  cidade: Omit<ICity, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
