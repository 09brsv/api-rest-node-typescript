import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People - getById", () => {
  let cidadeId: number | undefined;
  beforeAll(async () => {
    const postResponse = await testServer
      .post("/cidades")
      .send({ nome: "Caratinga" });
    cidadeId = postResponse.body;
  });

  it("should return a Pessoas object", async () => {
    const postResponse = await testServer
      .post("/pessoas")
      .send({
        nomeCompleto: "br bat or",
        cidadeId,
        email: "brbatgetbyid@gmail.com",
      });

    expect(postResponse.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer
      .get(`/pessoas/${postResponse.body}`)
      .send();

    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body).toHaveProperty("nomeCompleto");
  });

  it("should return an error if id is not found", async () => {
    const getResponse = await testServer.get("/pessoas/9999").send();

    expect(getResponse.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(getResponse.body).toHaveProperty("errors.default");
  });
});
