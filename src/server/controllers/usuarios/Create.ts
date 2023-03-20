import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";

interface IBodyProps extends Omit<IUser, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().strict().required().min(3),
      email: yup.string().strict().required().min(3).email(),
      senha: yup.number().required().moreThan(0).min(1),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IUser>, res: Response) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
