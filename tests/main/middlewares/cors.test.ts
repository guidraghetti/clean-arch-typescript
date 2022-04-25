import request from 'supertest'
import app from '../../../src/main/config/app'

describe('CORS Middleware', () => {
  test('should return enable CORS', async () => {
    app.get('test_cors', (req, res) => {
      res.send()
    })

    await request(app).get('/test_cors').expect('access-control-allow-origin', '*')
  })
})
