export interface AwardIntervalsDTO {
  min: ProducerIntervalDTO[];
  max: ProducerIntervalDTO[];
}

export interface ProducerIntervalDTO {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
