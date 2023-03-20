import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";

interface IBodyProps extends Omit<IUser, "id"> {}

export const sigUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().strict().required().min(3),
      email: yup.string().strict().required().min(5).email(),
      senha: yup.string().strict().required().min(6)
    })
  ),
}));

export const sigUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
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
