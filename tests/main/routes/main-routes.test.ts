import request from 'supertest'
import { app } from '@/main/config/app'

describe('Main Routes', () => {
  describe('GET /', () => {
    test('should return 200', async () => {
      await request(app)
        .get('/api')
        .expect(200)
    })
  })
})
