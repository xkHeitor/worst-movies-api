import { Router } from "express";
import { AwardsController } from "./controllers/awards.controller";

const routes = Router();
const controller = new AwardsController();

routes.get("/awards/intervals", controller.handle);

export { routes };
