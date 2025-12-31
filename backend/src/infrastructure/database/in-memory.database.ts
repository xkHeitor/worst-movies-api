import { Award } from "../../domain/entities/award.entity";

class InMemoryDatabase {
  private awards: Award[] = [];

  insert(award: Award) {
    this.awards.push(award);
  }

  getAll(): Award[] {
    return this.awards;
  }
}

export const database = new InMemoryDatabase();