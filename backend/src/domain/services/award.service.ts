import { Award } from "../entities/award.entity";

export class AwardService {

  static calculateIntervals(awards: Award[]) {
    const map = new Map<string, number[]>();
    awards.forEach(({ year, producers }: Award) => {
      producers.split(/,| and /).forEach((p) => {
        const producer = p.trim();
        map.set(producer, [...(map.get(producer) || []), year]);
      });
    });

    const intervals: any[] = []
    map.forEach((years, producer) => {
      years.sort();
      for (let i = 1; i < years.length; i++) {
        intervals.push({
          producer,
          interval: years[i] - years[i - 1],
          previousWin: years[i - 1],
          followingWin: years[i],
        });
      }
    });

    const min = Math.min(...intervals.map((i) => i.interval));
    const max = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === min),
      max: intervals.filter((i) => i.interval === max),
    };
  }
}
