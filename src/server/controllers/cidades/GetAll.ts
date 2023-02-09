import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CidadesProvider } from "../../database/providers/cidades";

import { validation } from "../../shared/middleware";

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      id: yup.number().integer().notRequired().default(0),
      page: yup.number().moreThan(0).notRequired(),
      limit: yup.number().moreThan(0).notRequired(),
      filter: yup.string().strict(true).notRequired(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await CidadesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || "",
    req.query.id
  );
  const count = await CidadesProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader("acess-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
