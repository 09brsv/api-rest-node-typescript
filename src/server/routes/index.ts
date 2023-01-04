import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_, res) => res.send("Olá"));

router.post("/teste", (req, res) =>
  res.status(StatusCodes.UNAUTHORIZED).json(req.body)
);

export { router };
