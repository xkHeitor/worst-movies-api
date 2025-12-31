import express from "express";
import { setupRoutes } from "@src/infrastructure/http/routes";

export const app = express();
app.use(express.json());
setupRoutes(app);
