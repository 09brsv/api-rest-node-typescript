import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Citiess - UpdateById", () => {
  it("Cria registro e atualiza registro por id", async () => {
    const respOne = await testServer.post("/cidades").send({ nome: "Caxias" });

    expect(respOne.statusCode).toEqual(StatusCodes.CREATED);

    const getById = await testServer
      .put(`/cidades/${respOne.body}`)
      .send({ nome: "Outra" });

    expect(getById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta buscar registro que não existe", async () => {
    const respOne = await testServer
      .put("/cidades/999")
      .send({ nome: "Outra" });

    expect(respOne.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(respOne.body).toHaveProperty("errors.default");
  });
});
