import { Router } from "express";

import { CitiessController, PersonsController } from "./../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá, DEV!");
});

router.get(
  "/cidades",
  CitiessController.getAllValidation,
  CitiessController.getAll
);
router.post(
  "/cidades",
  CitiessController.createValidation,
  CitiessController.create
);
router.get(
  "/cidades/:id",
  CitiessController.getByIdValidation,
  CitiessController.getById
);
router.put(
  "/cidades/:id",
  CitiessController.updateByIdValidation,
  CitiessController.updateById
);
router.delete(
  "/cidades/:id",
  CitiessController.deleteByIdValidation,
  CitiessController.deleteById
);

router.get(
  "/pessoas",
  PersonsController.getAllValidation,
  PersonsController.getAll
);
router.post(
  "/pessoas",
  PersonsController.createValidation,
  PersonsController.create
);
router.get(
  "/pessoas/:id",
  PersonsController.getByIdValidation,
  PersonsController.getById
);
router.put(
  "/pessoas/:id",
  PersonsController.updateByIdValidation,
  PersonsController.updateById
);
router.delete(
  "/pessoas/:id",
  PersonsController.deleteByIdValidation,
  PersonsController.deleteById
);

export { router };
