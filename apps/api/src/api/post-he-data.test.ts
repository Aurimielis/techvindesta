import app from '../main';

const request = require('supertest');

describe('POST /Post-dataHE.php', () => {
  test('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200)
  })

  it('should error if API key does not match', () => {
    return request(app)
      .post('/Post-dataHE.php')
      .send({ apiKey: 'x' })
      .expect(409)
  })

  it('should fail for invalid sensor data', () => {
    return request(app)
      .post('/Post-dataHE.php')
      .send({ apiKey: 'v', value1: "nope", value2: "2", value3: 3 })
      .expect(400)
  })

  it('should fail for invalid HENr valid sensor data', () => {
    return request(app)
      .post('/Post-dataHE.php')
      .send({ apiKey: 'v', value1: 1, value2: 2, value3: 3, HENr: "potato" })
      .expect(400)
  })

  it('should fail for non-existent table (HENr)', () => {
    return request(app)
      .post('/Post-dataHE.php')
      .send({ apiKey: 'v', value1: 1, value2: 2, value3: 3, HENr: -1 })
      .expect(400)
  })
})
