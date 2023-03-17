import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - getAll", () => {
  let cidadeId: number | undefined;
  beforeAll(async () => {
    const postResponse = await testServer.post('/cidades').send({nome: "Caratinga"})
    cidadeId = postResponse.body
  })

  it("should return all people", async () => {
    const postResponse = await testServer.post("/pessoas").send({
      nomeCompleto: "br bat or",
      cidadeId,
      email: "brbatgetAll@gmail.com",
    });

    expect(postResponse.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get("/pessoas").send();

    expect(Number(getResponse.header["x-total-count"])).toBeGreaterThan(0);
    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body.length).toBeGreaterThan(0);
  });
});
