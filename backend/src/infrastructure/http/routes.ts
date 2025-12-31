import { AwardsController } from "./controllers/awards.controller";
import { HttpApp } from "./types/http.types";
import { database } from "../database/in-memory.database";

export function setupRoutes(app: HttpApp) {
  const controller = new AwardsController(database);
  app.get("/awards/intervals", controller.handler.bind(controller));
}
