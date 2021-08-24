import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarController";
import { UpaloadCarImagesController } from "@modules/cars/useCases/upaloadCarImages/UpaloadCarImagesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const uploadCar = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const upaloadCarImagesController = new UpaloadCarImagesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarController.handle);

carsRoutes.post(
  "/specifications/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCar.array("images"),
  upaloadCarImagesController.handle
);

export { carsRoutes };
