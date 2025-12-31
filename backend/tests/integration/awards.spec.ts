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
});
