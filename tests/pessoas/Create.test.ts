import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - create", () => {
  let cidadeId: number | undefined;
  beforeAll(async () => {
    const postResponse = await testServer
      .post("/cidades")
      .send({ nome: "Caratinga" });
    cidadeId = postResponse.body;
  });

  it("should update people by id", async () => {
    const postResponse = await testServer.post("/pessoas").send({
      nomeCompleto: "br bat or",
      cidadeId,
      email: "brbatcreate@gmail.com",
    });

    expect(postResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof postResponse.body).toEqual("number");
  });
});
