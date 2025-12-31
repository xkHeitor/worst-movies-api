import { GetAwardIntervalsUseCase } from "@src/application/use-cases/get-award-intervals.usecase";
import { AwardRepository } from "@src/domain/repositories/award.repository";
import { HttpRequest, HttpResponse } from "@src/infrastructure/http/types/http.types";
import { Logger } from "@src/infrastructure/utils/logger";

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
