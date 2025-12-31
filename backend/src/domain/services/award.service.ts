import { Award } from "@src/domain/entities/award.entity";
import { ProducerInterval } from "@src/domain/entities/producer-interval.entity";

export class AwardService {

  static calculateIntervals(awards: Award[]): { min: ProducerInterval[], max: ProducerInterval[] } {
    if (!awards || awards.length === 0) {
      return { min: [], max: [] };
    }

    const producerYearsMap = this.groupYearsByProducer(awards);
    const intervals = this.calculateAllIntervals(producerYearsMap);
    return this.findMinMaxIntervals(intervals);
  }

  private static groupYearsByProducer(awards: Award[]): Map<string, number[]> {
    const map = new Map<string, number[]>();

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

  private static calculateAllIntervals(producerYearsMap: Map<string, number[]>): ProducerInterval[] {
    const intervals: ProducerInterval[] = [];
    
    producerYearsMap.forEach((years, producer) => {
      if (years.length < 2) {
        return;
      }

      const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
      
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
