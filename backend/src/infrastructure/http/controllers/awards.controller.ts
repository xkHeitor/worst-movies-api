import { HttpRequest, HttpResponse } from "../types/http.types";
import { GetAwardIntervalsUseCase } from "../../../application/use-cases/get-award-intervals.usecase";
import { AwardRepository } from "../../../domain/repositories/award.repository";
import { Logger } from "../../utils/logger";

export class AwardsController {
  constructor(private readonly awardRepository: AwardRepository) {}

  handler(_: HttpRequest, res: HttpResponse) {
    try {
      const awardIntervalsUseCase = new GetAwardIntervalsUseCase(
        this.awardRepository
      );
      const result = awardIntervalsUseCase.execute();
      return res.json(result);
    } catch (error) {
      Logger.error("Error in AwardsController.handler", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
