import fs from "fs";
import csv from "csv-parser";
import { database } from "../database/in-memory.database";

export function loadCSV() {
  fs.createReadStream("backend/data/movielist.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", (row) => {
      if (row.winner === "yes") {
        database.insert({
          year: Number(row.year),
          producers: row.producers,
        });
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      const awards = database.getAll();
      console.info(awards[0]);
    });
}
