import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().moreThan(0).notRequired(),
    limit: yup.number().moreThan(0).notRequired(),
    filter: yup.string().strict(true).notRequired()
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => { 
  console.log(req.query);
  
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!")
};
