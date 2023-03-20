import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { PersonsProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middleware";
import { IPerson } from "../../database/models";

interface IBodyProps extends Omit<IPerson, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nomeCompleto: yup.string().strict().required().min(3),
      email: yup.string().strict().required().min(3).email(),
      cidadeId: yup.number().required().moreThan(0).min(1),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IPerson>, res: Response) => {
  const result = await PersonsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
