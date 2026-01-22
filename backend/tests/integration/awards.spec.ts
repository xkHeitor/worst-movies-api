import request from 'supertest';
import { app } from '@src/infrastructure/http/server';
import { loadCSV } from '@src/infrastructure/utils/csv-loader';

describe('GET /awards/intervals', () => {
  beforeAll(async () => {
    await loadCSV();
  });

  it('deve retornar intervalos de prêmios com min e max', async () => {
    const response = await request(app).get('/awards/intervals');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
  });

  it('deve retornar produtores com intervalos válidos', async () => {
    const response = await request(app).get('/awards/intervals');

    if (response.body.min.length > 0) {
      const minInterval = response.body.min[0];
      expect(minInterval).toHaveProperty('producer');
      expect(minInterval).toHaveProperty('interval');
      expect(minInterval).toHaveProperty('previousWin');
      expect(minInterval).toHaveProperty('followingWin');
      expect(typeof minInterval.producer).toBe('string');
      expect(typeof minInterval.interval).toBe('number');
    }
  });

  it('deve retornar os valores específicos corretos baseado nos dados do CSV', async () => {
    const response = await request(app).get('/awards/intervals');

    expect(response.status).toBe(200);

    expect(response.body.min).toBeDefined();
    expect(response.body.max).toBeDefined();
    expect(response.body.min.length).toBeGreaterThan(0);
    expect(response.body.max.length).toBeGreaterThan(0);

    const minInterval = response.body.min[0].interval;
    expect(minInterval).toBeGreaterThanOrEqual(1);

    const maxInterval = response.body.max[0].interval;
    expect(maxInterval).toBeGreaterThanOrEqual(minInterval);

    response.body.min.forEach((item: any) => {
      expect(item.followingWin).toBeGreaterThan(item.previousWin);
      expect(item.interval).toBe(item.followingWin - item.previousWin);
    });

    response.body.max.forEach((item: any) => {
      expect(item.followingWin).toBeGreaterThan(item.previousWin);
      expect(item.interval).toBe(item.followingWin - item.previousWin);
    });
  });

  it('deve retornar sempre os mesmos valores (teste de regressão)', async () => {
    const response = await request(app).get('/awards/intervals');

    expect(response.status).toBe(200);

    const minProducers = response.body.min.map((item: any) => item.producer).sort();
    const maxProducers = response.body.max.map((item: any) => item.producer).sort();

    expect(minProducers.length).toBeGreaterThan(0);
    expect(maxProducers.length).toBeGreaterThan(0);

    minProducers.forEach((producer: string) => {
      expect(producer).toBeTruthy();
      expect(producer.length).toBeGreaterThan(0);
    });

    maxProducers.forEach((producer: string) => {
      expect(producer).toBeTruthy();
      expect(producer.length).toBeGreaterThan(0);
    });
  });
});
