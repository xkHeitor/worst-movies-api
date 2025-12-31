export class ValidationError extends Error {

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AwardValidator {

  static validateYear(year: number): void {
    if (!Number.isInteger(year)) {
      throw new ValidationError("Year must be an integer");
    }

    if (year < 1900 || year > new Date().getFullYear() + 10) {
      throw new ValidationError(
        `Year must be between 1900 and ${new Date().getFullYear() + 10}`
      );
    }
  }

  static validateProducers(producers: string): void {
    if (!producers || typeof producers !== "string") {
      throw new ValidationError("Producers must be a non-empty string");
    }

    if (producers.trim().length === 0) {
      throw new ValidationError("Producers cannot be empty or whitespace only");
    }
  }
}
