import { Router } from "express";
import { cidadesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => res.send("Ok"));
router.get("/cidades", cidadesController.getAllValidation, cidadesController.getAll);
router.get("/cidades/:id", cidadesController.getByIdValidation, cidadesController.getById);

router.put("/cidades/:id", cidadesController.updateByIdValidation, cidadesController.updateById);

router.delete("/cidades/:id", cidadesController.deleteByIdValidation, cidadesController.deleteById);

router.post("/cidades", cidadesController.createValidation, cidadesController.create);

export { router };
