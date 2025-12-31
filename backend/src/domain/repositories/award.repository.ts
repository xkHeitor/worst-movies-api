import { Award } from "@src/domain/entities/award.entity";

export interface AwardRepository {
  getAll(): Award[];
  insert(award: Award): void;
}
