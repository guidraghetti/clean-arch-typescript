import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('should return enable CORS', async () => {
    app.get('test_cors', (req, res) => {
      res.send()
    })

    await request(app).get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      .expect('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
      .expect('access-control-allow-credentials', 'true')
  })
})
