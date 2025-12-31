import { Request, Response } from "express";
import { GetAwardIntervalsUseCase } from "../../../application/use-cases/get-award-intervals.usecase";

export class AwardsController {
  handle(req: Request, res: Response) {
    const useCase = new GetAwardIntervalsUseCase();
    return res.json(useCase.execute());
  }
}
