import { Award } from "../../domain/entities/award.entity";
import { AwardRepository } from "../../domain/repositories/award.repository";

class InMemoryDatabase implements AwardRepository {
  private awards: Award[] = [];

  insert(award: Award) {
    this.awards.push(award);
  }

  getAll(): Award[] {
    return this.awards;
  }
}

export const database = new InMemoryDatabase();