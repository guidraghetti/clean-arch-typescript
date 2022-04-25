import { AccountMongoRepository } from '../../../../../src/infra/db/mongodb/account-repository/account'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers/mongo-helper'

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('should return an account on success', async () => {
    const sut = makeSut()

    const addedAccount = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(addedAccount).toBeTruthy()
    expect(addedAccount.id).toBeTruthy()
    expect(addedAccount.name).toBe('any_name')
    expect(addedAccount.email).toBe('any_email@mail.com')
    expect(addedAccount.password).toBe('any_password')
  })
})
