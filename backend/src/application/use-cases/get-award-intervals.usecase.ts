import { AwardService } from "../../domain/services/award.service";
import { AwardRepository } from "../../domain/repositories/award.repository";
import { AwardIntervalsDTO } from "../dtos/award-intervals.dto";
import { Logger } from "../../infrastructure/utils/logger";

export class GetAwardIntervalsUseCase {

  constructor(private readonly awardRepository: AwardRepository) {}

  execute(): AwardIntervalsDTO {
    try {
      Logger.debug("Executing GetAwardIntervalsUseCase");
      const awards = this.awardRepository.getAll();
      if (!awards || awards.length === 0) {
        Logger.warn("No awards found in repository");
        return { min: [], max: [] };
      }

      const result = AwardService.calculateIntervals(awards);
      Logger.debug("Award intervals calculated successfully", {
        minCount: result.min.length,
        maxCount: result.max.length,
      });

      return result;
    } catch (error) {
      Logger.error("Error executing GetAwardIntervalsUseCase", error);
      throw error;
    }
  }
}
