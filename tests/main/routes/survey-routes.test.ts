import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db'
import request from 'supertest'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@/main/config/constants'
import { AddAccountParams } from '@/domain/usecases'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (role?: string): Promise<string> => {
  const account: AddAccountParams = {
    name: 'any_name',
    email: 'email@mail.com',
    password: 'any_password'
  }

  if (role) {
    account.role = role
  }
  const res = await accountCollection.insertOne(account)

  const id = res.insertedId
  const accessToken = sign({ id }, JWT_SECRET)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')

    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app).post('/surveys').send({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'http://image.com/image.jpg'
        }]
      }).expect(403)
    })

    test('should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken('admin')

      await request(app).post('/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{
            answer: 'any_answer',
            image: 'http://image.com/image.jpg'
          }, {
            answer: 'other_answer'
          }]
        }).expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/surveys').expect(403)
    })

    test('should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app).get('/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /surveys/:survey_id/results', () => {
    test('should return 403 on save survey without accessToken', async () => {
      await request(app).put('/surveys/any_id/results').send({
        answer: 'any_answer'
      }).expect(403)
    })

    test('should return 200 on save survey result with valid accessToken', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'http://image.com/image.jpg'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })

      const accessToken = await makeAccessToken()
      await request(app)
        .put(`/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:survey_id/results', () => {
    test('should return 403 on load survey result without accessToken', async () => {
      await request(app).get('/surveys/any_id/results').expect(403)
    })

    test('should return 200 on load survey result with valid accessToken', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'http://image.com/image.jpg'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })

      const accessToken = await makeAccessToken()
      await request(app)
        .get(`/surveys/${res.insertedId.toHexString()}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
