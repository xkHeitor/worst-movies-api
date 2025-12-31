import { GetAwardIntervalsUseCase } from '@src/application/use-cases/get-award-intervals.usecase';
import { AwardRepository } from '@src/domain/repositories/award.repository';
import { Award } from '@src/domain/entities/award.entity';

describe('GetAwardIntervalsUseCase', () => {
  let useCase: GetAwardIntervalsUseCase;
  let mockRepository: jest.Mocked<AwardRepository>;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
    } as any;
    useCase = new GetAwardIntervalsUseCase(mockRepository);
  });

  it('deve retornar arrays vazios quando repositório está vazio', () => {
    mockRepository.getAll.mockReturnValue([]);

    const result = useCase.execute();

    expect(result).toEqual({ min: [], max: [] });
  });

  it('deve calcular intervalos com dados do repositório', () => {
    const mockAwards: Award[] = [
      { year: 2000, producers: 'Producer A' },
      { year: 2005, producers: 'Producer A' },
    ];
    mockRepository.getAll.mockReturnValue(mockAwards);

    const result = useCase.execute();

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
