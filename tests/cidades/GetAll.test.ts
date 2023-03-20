import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Citiess - GetAll", () => {
  it("Cria registro e busca registros", async () => {
    const respOne = await testServer.post("/cidades").send({ nome: "Caxias" });

    expect(respOne.statusCode).toEqual(StatusCodes.CREATED);

    const getAll = await testServer.get("/cidades").send();

    expect(Number(getAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(getAll.statusCode).toEqual(StatusCodes.OK);
    expect(getAll.body.length).toBeGreaterThan(0);
  });
});
