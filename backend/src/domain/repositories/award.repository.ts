import { Award } from "../entities/award.entity";

export interface AwardRepository {
  getAll(): Award[];
  insert(award: Award): void;
}
