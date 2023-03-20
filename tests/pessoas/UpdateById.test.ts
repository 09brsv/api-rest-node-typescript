import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Person - updateById", () => {
  let cidadeId: number | undefined;
  beforeAll(async () => {
    const postResponse = await testServer
      .post("/cidades")
      .send({ nome: "Caratinga" });
    cidadeId = postResponse.body;
  });

  it("should update Person by id", async () => {
    const postResponse = await testServer.post("/pessoas").send({
      nomeCompleto: "br bat or",
      cidadeId,
      email: "brbatcreate@gmail.com",
    });

    expect(postResponse.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer
      .put(`/pessoas/${postResponse.body}`)
      .send({
        nomeCompleto: "br bat or update not found",
        cidadeId,
        email: "brbatupdatebyid@gmail.com",
      });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should return an error if id is not found", async () => {
    const putResponse = await testServer.put("/pessoas/9999").send({
      nomeCompleto: "br bat or update",
      cidadeId,
      email: "brbatupdatebyidnotfound@gmail.com",
    });

    expect(putResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(putResponse.body).toHaveProperty("errors.default");
  });
});
