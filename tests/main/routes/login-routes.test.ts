import { hash } from 'bcryptjs'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../src/infra/db/mongodb/helpers/mongo-helper'
import app from '../../../src/main/config/app'

let accountCollection: Collection
let password: string

describe('Login routes', () => {
  beforeAll(async () => {
    password = await hash('any_password', 12)
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await accountCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
  })

  describe('Signup Routes', () => {
    test('should return a 200 response', async () => {
      await request(app).post('/signup').send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: password,
        passwordConfirmation: password
      }).expect(200)
    })
  })

  describe('Login Routes', () => {
    test('should return 200 on login', async () => {
      await request(app).post('/login').send({
        email: 'any_email@mail.com',
        password: password
      }).expect(200)
    })

    test('should return 401 on login with wrong credentials', async () => {
      await request(app).post('/login').send({
        email: 'wrong_email@mail.com',
        password: 'wrong_gpassword'
      }).expect(401)
    })
  })
})
