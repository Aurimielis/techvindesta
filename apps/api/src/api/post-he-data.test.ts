import request from 'supertest';
import app from '../main'
import { Request, Response } from 'express';

describe('POST /he-data', () => {
  it('should accept sensor data', async () => {
    const response = await request(app)
      .post('/Post-dataHE.php')
      .send({ message: 'Hello, this should accept sensor data' })
      .expect(200)
    expect(response.body).toEqual({ message: 'Hello, this should accept sensor data' })
  })
})
