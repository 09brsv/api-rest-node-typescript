import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id : yup.number().integer().required().moreThan(0)
  }))
}));

export const getById = async (req: Request<IParamProps, {}, {}, IParamProps>, res: Response) => {
  const id = Number(req.params.id);

  if (id === 999) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
  }

  return res.status(StatusCodes.OK).json({
    id,
    nome: "Caxias",
  });
};
