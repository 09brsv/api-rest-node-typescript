import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Citiess - GetById", () => {
  it("Cria registro e Busca registro por id", async () => {
    const respOne = await testServer.post("/cidades").send({ nome: "Caxias" });

    expect(respOne.statusCode).toEqual(StatusCodes.CREATED);

    const getById = await testServer.get(`/cidades/${respOne.body}`).send();

    expect(getById.statusCode).toEqual(StatusCodes.OK);
    expect(getById.body).toHaveProperty("nome");
  });

  it("Tenta buscar registro que não existe", async () => {
    const respOne = await testServer.get("/cidades/999").send();

    expect(respOne.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(respOne.body).toHaveProperty("errors.default");
  });
});
