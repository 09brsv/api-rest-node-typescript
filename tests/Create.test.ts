import { StatusCodes } from "http-status-codes";
import { testServer } from "./jest.setup";



describe('Cidades - Create', () => {
  
  it('Cria registro', async () => {

    const respOne = await testServer.post('/cidades').send({nome : 'Caxias'});

    expect(respOne.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof respOne.body).toEqual('number');
  });

  it('impede criar registro com nome curto', async () => {

    const respOne = await testServer.post('/cidades').send({nome : 'Ca'});

    expect(respOne.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(respOne.body).toEqual('errors.body.nome');
  });


});