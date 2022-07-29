import { Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config/app'

let app: Express

describe('Main Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  describe('GET /', () => {
    test('should return 200', async () => {
      await request(app)
        .get('/api')
        .expect(200)
    })
  })
})
