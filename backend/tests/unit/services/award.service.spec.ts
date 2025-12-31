import { AwardService } from '@src/domain/services/award.service';
import { Award } from '@src/domain/entities/award.entity';

describe('AwardService', () => {
  describe('calculateIntervals', () => {
    it('deve retornar arrays vazios quando não há prêmios', () => {
      const result = AwardService.calculateIntervals([]);

      expect(result).toEqual({ min: [], max: [] });
    });

    it('deve calcular intervalos corretamente', () => {
      const awards: Award[] = [
        { year: 2000, producers: 'Producer A' },
        { year: 2005, producers: 'Producer A' },
        { year: 2010, producers: 'Producer B' },
        { year: 2015, producers: 'Producer B' },
      ];

      const result = AwardService.calculateIntervals(awards);

      expect(result.min.length).toBeGreaterThan(0);
      expect(result.max.length).toBeGreaterThan(0);
      expect(result.min[0].interval).toBe(5);
      expect(result.max[0].interval).toBe(5);
    });

    it('deve identificar menor e maior intervalo', () => {
      const awards: Award[] = [
        { year: 2000, producers: 'Producer A' },
        { year: 2001, producers: 'Producer A' },
        { year: 2010, producers: 'Producer B' },
        { year: 2020, producers: 'Producer B' },
      ];

      const result = AwardService.calculateIntervals(awards);

      expect(result.min[0].interval).toBe(1);
      expect(result.min[0].producer).toBe('Producer A');
      expect(result.max[0].interval).toBe(10);
      expect(result.max[0].producer).toBe('Producer B');
    });

    it('deve separar múltiplos produtores', () => {
      const awards: Award[] = [
        { year: 2000, producers: 'Producer A and Producer B' },
        { year: 2001, producers: 'Producer A' },
        { year: 2002, producers: 'Producer B' },
      ];

      const result = AwardService.calculateIntervals(awards);

      expect(result.min.length).toBeGreaterThan(0);
      expect(result.max.length).toBeGreaterThan(0);
    });
  });
});
