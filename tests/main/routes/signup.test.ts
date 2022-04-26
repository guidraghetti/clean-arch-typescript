import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/helpers/mongo-helper'
import app from '../../../src/main/config/app'

describe('Signup Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return a 200 response', async () => {
    await request(app).post('/signup').send({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '123456',
      passwordConfirmation: '123456'
    }).expect(200)
  })
})
