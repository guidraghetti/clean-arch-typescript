import request from 'supertest'
import app from '../../../src/main/config/app'

describe('Content Type Middleware', () => {
  test('should return default Content Type as json', async () => {
    app.get('/test_content_type', (_req, res) => {
      res.send('')
    })

    await request(app).get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('should return xml content tyé when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app).get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
