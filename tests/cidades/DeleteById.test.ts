import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Cidades - DeleteById', () => {
  
  it("Cria registro e Deleta registro por id", async () => {
    const respOne = await testServer.post("/cidades").send({ nome: "Caxias" });

    expect(respOne.statusCode).toEqual(StatusCodes.CREATED);

    const deleteById = await testServer
      .delete(`/cidades/${respOne.body}`)
      .send();

    expect(deleteById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta deletar registro que não existe', async () => {

    const respOne = await testServer.delete('/cidades/999').send();

    expect(respOne.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(respOne.body).toHaveProperty('errors.default');
  });


});