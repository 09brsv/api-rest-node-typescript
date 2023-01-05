import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SchemaOf, ValidationError } from "yup";

type TPropert = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TPropert, SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;
// type é uma outra forma de tipar uma função que não seja a interface

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema)

  const errorsResult : Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TPropert], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
      
      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
      
      errorsResult[key] = errors
      
    }
  });

  Object.entries(errorsResult)[0]
  ? res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
  : next()
    
};
