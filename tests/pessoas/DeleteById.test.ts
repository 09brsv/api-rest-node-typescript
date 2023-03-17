import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('People - deleteById', () => {
  let cidadeId: number | undefined;
  beforeAll(async () => {
    const postResponse = await testServer
      .post("/cidades")
      .send({ nome: "Caratinga" });
    cidadeId = postResponse.body;
  });

  it("should delete people by id", async () => {
    const postResponse = await testServer
      .post("/pessoas")
      .send({
        nomeCompleto: "br bat or",
        cidadeId,
        email: "brbatdeletebyid@gmail.com",
      });

    expect(postResponse.statusCode).toEqual(StatusCodes.CREATED);

    const deleteResponse = await testServer.delete(`/pessoas/${postResponse.body}`).send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it("should return error when not found", async () => {
    const deleteResponse = await testServer.delete(`/pessoas/9999`).send();

    expect(deleteResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(deleteResponse.body).toHaveProperty("errors.default");
  })
})