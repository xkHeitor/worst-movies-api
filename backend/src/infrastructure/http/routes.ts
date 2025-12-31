import { AwardsController } from "@src/infrastructure/http/controllers/awards.controller";
import { HttpApp } from "@src/infrastructure/http/types/http.types";
import { database } from "@src/infrastructure/database/in-memory.database";

export function setupRoutes(app: HttpApp) {
  const controller = new AwardsController(database);
  app.get("/awards/intervals", controller.handler.bind(controller));
}
