import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { database } from "@src/infrastructure/database/in-memory.database";
import { Logger } from "@src/infrastructure/utils/logger";
import { AwardValidator } from "@src/domain/validators/award.validator";

export function loadCSV(): Promise<void> {
  const defaultPath = path.join(__dirname, "../../../../backend/data");
  const csvDir = process.env.CSV_PATH || defaultPath;

  return new Promise((resolve, reject) => {
    Logger.info(`Looking for CSV files in: ${csvDir}`);

    if (!fs.existsSync(csvDir)) {
      const error = new Error(`Directory not found at path: ${csvDir}`);
      Logger.error("CSV directory not found", error);
      reject(error);
      return;
    }

    const stats = fs.statSync(csvDir);
    let csvPath: string;

    if (stats.isFile()) {
      csvPath = csvDir;
      Logger.info(`Using CSV file: ${csvPath}`);
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(csvDir).filter(file => file.endsWith('.csv'));
      
      if (files.length === 0) {
        const error = new Error(`No CSV files found in directory: ${csvDir}`);
        Logger.error("No CSV files found", error);
        reject(error);
        return;
      }

      csvPath = path.join(csvDir, files[0]);
      Logger.info(`Found CSV file: ${files[0]} at ${csvPath}`);
    } else {
      const error = new Error(`Path is neither a file nor directory: ${csvDir}`);
      Logger.error("Invalid path", error);
      reject(error);
      return;
    }

    let recordCount = 0;
    let errorCount = 0;

    fs.createReadStream(csvPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        try {
          if (row.winner === "yes") {
            const year = Number(row.year);
            const producers = row.producers;

            AwardValidator.validateYear(year);
            AwardValidator.validateProducers(producers);

            database.insert({ year, producers });
            recordCount++;
          }
        } catch (error) {
          errorCount++;
          Logger.warn(`Invalid record at row: ${JSON.stringify(row)}`, error);
        }
      })
      .on("end", () => {
        Logger.info(
          `CSV file successfully processed. Records loaded: ${recordCount}, Errors: ${errorCount}`
        );
        resolve();
      })
      .on("error", (error) => {
        Logger.error("Error reading CSV file", error);
        reject(error);
      });
  });
}
