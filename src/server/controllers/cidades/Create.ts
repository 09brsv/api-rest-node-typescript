import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface ICity {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => { 
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!")
};
