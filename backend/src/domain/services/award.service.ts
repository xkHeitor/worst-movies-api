import { Award } from "@src/domain/entities/award.entity";
import { ProducerInterval } from "@src/domain/entities/producer-interval.entity";

type ProducerYearsMap = Map<string, number[]>;

export class AwardService {
  private static readonly MIN_WINS_FOR_INTERVAL = 2;

  static calculateIntervals(awards: Award[]): { min: ProducerInterval[], max: ProducerInterval[] } {
    if (!awards || awards.length === 0) {
      return { min: [], max: [] };
    }

    const producerYearsMap = this.groupYearsByProducer(awards);
    const intervals = this.calculateAllIntervals(producerYearsMap);
    return this.findMinMaxIntervals(intervals);
  }

  private static groupYearsByProducer(awards: Award[]): ProducerYearsMap {
    const map: ProducerYearsMap = new Map<string, number[]>();

    awards.forEach(({ year, producers }) => {
      if (!producers || typeof producers !== 'string') {
        return;
      }

      this.splitProducers(producers).forEach((producer) => {
        const years = map.get(producer) || [];
        map.set(producer, [...years, year]);
      });
    });
    
    return map;
  }

  private static splitProducers(producers: string): string[] {
    return producers
      .split(/,| and /)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  private static calculateAllIntervals(producerYearsMap: ProducerYearsMap): ProducerInterval[] {
    const intervals: ProducerInterval[] = [];
    
    producerYearsMap.forEach((years, producer) => {
      if (years.length < this.MIN_WINS_FOR_INTERVAL) {
        return;
      }

      const uniqueYears = this.getUniqueYearsSorted(years);
      for (let i = 1; i < uniqueYears.length; i++) {
        intervals.push({
          producer,
          interval: uniqueYears[i] - uniqueYears[i - 1],
          previousWin: uniqueYears[i - 1],
          followingWin: uniqueYears[i],
        });
      }
    });
    
    return intervals;
  }

  private static getUniqueYearsSorted(years: number[]): number[] {
    const uniqueYears = Array.from(new Set(years));
    return uniqueYears.sort((a, b) => a - b);
  }

  private static findMinMaxIntervals(intervals: ProducerInterval[]): { min: ProducerInterval[], max: ProducerInterval[] } {
    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const min = Math.min(...intervals.map((i) => i.interval));
    const max = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === min),
      max: intervals.filter((i) => i.interval === max),
    };
  }
}
