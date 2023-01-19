import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id : yup.number().integer().required().moreThan(0)
  }))
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
   
  if (Number(req.params.id) === 999) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Registro não encontrado'
      },
    });
  }
  
  res.status(StatusCodes.NO_CONTENT).send()
};