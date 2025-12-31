import { AwardService } from "../../domain/services/award.service";
import { database } from "../../infrastructure/database/in-memory.database";

export class GetAwardIntervalsUseCase {
  execute() {
    return AwardService.calculateIntervals(database.getAll());
  }
}
