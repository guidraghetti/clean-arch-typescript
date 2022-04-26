import request from 'supertest'
import app from '../../../src/main/config/app'

describe('Signup Route', () => {
  test('should return a 200 response', async () => {
    await request(app).post('/signup').send({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '123456',
      passwordConfirmation: '123456'
    }).expect(200)
  })
})
