import { Collection } from 'mongodb'
import { MongoHelper } from '../../../src/infra/db'
import request from 'supertest'
import app from '../../../src/main/config/app'

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await surveyCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('accounts')
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey', async () => {
      await request(app).post('/surveys').send({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'http://image.com/image.jpg'
        }]
      }).expect(403)
    })
  })
})
