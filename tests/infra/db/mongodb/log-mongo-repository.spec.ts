import { Collection } from 'mongodb'
import { LogMongoRepository, MongoHelper } from '@/infra/db'
import { MONGO_URL } from '@/main/config/constants'

const makeSut = (): LogMongoRepository => new LogMongoRepository()

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection('error')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on succes', async () => {
    const sut = makeSut()
    await sut.logError('any_error')

    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
