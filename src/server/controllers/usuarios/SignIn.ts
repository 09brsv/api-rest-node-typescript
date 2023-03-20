import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";

interface IBodyProps extends Omit<IUser, "id" | "nome"> {}

export const sigInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().strict().required().min(5).email(),
      senha: yup.string().strict().required().min(6),
    })
  ),
}));

export const sigIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;


  const result = await UsersProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: result.message,
      },
    });
  }

  if (senha !== result.senha){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "usuário e/ou senha incorretos",
      },
    });
  }

  return res.json({ acessToken: "teste" });
};
