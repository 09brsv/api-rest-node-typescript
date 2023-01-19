import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number
}

interface IBodyProps {
  nome: string
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id : yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome : yup.string().strict().required().min(3)
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => { 
 const id = Number(req.params.id);

 if (id === 999) {
   return res.status(StatusCodes.BAD_REQUEST).json({
     errors: {
       default: "Registro não encontrado",
     },
   });
 }

  return res.status(StatusCodes.NO_CONTENT).json();
};
