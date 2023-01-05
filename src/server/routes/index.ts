import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { cidadesController } from "../../controllers";
const router = Router();

router.get("/", (_, res) => res.send("Olá"));

router.post("/cidades", cidadesController.create);

export { router };
