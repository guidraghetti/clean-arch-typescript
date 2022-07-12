import { Collection } from 'mongodb'
import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockFakeAccountParams, mockFakeAccountWithRoleParams, mockFakeAccountWithTokenParams } from '../../../domain/mocks'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add', () => {
    test('should return an account on success', async () => {
      const sut = makeSut()

      const addedAccount = await sut.add(mockFakeAccountParams())

      expect(addedAccount).toBeTruthy()
      expect(addedAccount.id).toBeTruthy()
      expect(addedAccount.name).toBe('any_name')
      expect(addedAccount.email).toBe('any_email@mail.com')
      expect(addedAccount.password).toBe('any_password')
    })
  })

  describe('loadByEmail', () => {
    test('should return an account on loadByEmail success', async () => {
      await accountCollection.insertOne(mockFakeAccountParams())
      const sut = makeSut()

      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('wrong_mail@mail.com')

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken', () => {
    test('should update account accessToken on updateAccessToken success', async () => {
      const result = await accountCollection.insertOne(mockFakeAccountWithTokenParams())
      const sut = makeSut()

      await sut.updateAccessToken(result.insertedId.toString(), 'any_token')

      const account = await accountCollection.findOne({ _id: result.insertedId })

      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken', () => {
    test('should return an account on loadByToken without role success', async () => {
      await accountCollection.insertOne(mockFakeAccountWithRoleParams())
      const sut = makeSut()

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken with role success', async () => {
      await accountCollection.insertOne(mockFakeAccountWithRoleParams())

      const sut = makeSut()

      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken with admin role', async () => {
      await accountCollection.insertOne(mockFakeAccountWithRoleParams())

      const sut = makeSut()

      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken if user is admin', async () => {
      await accountCollection.insertOne(mockFakeAccountWithRoleParams())

      const sut = makeSut()

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return null on loadByToken with invalid role', async () => {
      await accountCollection.insertOne(mockFakeAccountWithTokenParams())
      const sut = makeSut()

      const account = await sut.loadByToken('any_token', 'any_role')

      expect(account).toBeFalsy()
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('wrong_mail@mail.com')

      expect(account).toBeFalsy()
    })

    test('should return null if loadByToken fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByToken('wrong_token')

      expect(account).toBeFalsy()
    })
  })
})
