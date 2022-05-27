import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../../src/domain/usecases'
import { AccountMongoRepository, MongoHelper } from '../../../../../src/infra/db'

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  accessToken: 'any_token',
  role: 'any_role'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await accountCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
  })

  describe('add', () => {
    test('should return an account on success', async () => {
      const sut = makeSut()

      const addedAccount = await sut.add(makeFakeAccount())

      expect(addedAccount).toBeTruthy()
      expect(addedAccount.id).toBeTruthy()
      expect(addedAccount.name).toBe('any_name')
      expect(addedAccount.email).toBe('any_email@mail.com')
      expect(addedAccount.password).toBe('any_password')
    })
  })

  describe('loadByEmail', () => {
    test('should return an account on loadByEmail success', async () => {
      const sut = makeSut()

      const addedAccount = await sut.loadByEmail('any_email@mail.com')

      expect(addedAccount).toBeTruthy()
      expect(addedAccount.id).toBeTruthy()
      expect(addedAccount.name).toBe('any_name')
      expect(addedAccount.email).toBe('any_email@mail.com')
      expect(addedAccount.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('wrong_mail@mail.com')

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken', () => {
    test('should update account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const accountToUpdate = await accountCollection.findOne({ email: makeFakeAccount().email })

      await sut.updateAccessToken(accountToUpdate._id.toString(), 'any_token')

      const account = await accountCollection.findOne({ _id: accountToUpdate._id })

      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken', () => {
    test('should return an account on loadByToken without role success', async () => {
      const sut = makeSut()

      const addedAccount = await sut.loadByToken('any_token')

      expect(addedAccount).toBeTruthy()
      expect(addedAccount.id).toBeTruthy()
      expect(addedAccount.name).toBe('any_name')
      expect(addedAccount.email).toBe('any_email@mail.com')
      expect(addedAccount.password).toBe('any_password')
    })

    test('should return an account on loadByToken with role success', async () => {
      const sut = makeSut()

      const addedAccount = await sut.loadByToken('any_token', 'any_role')

      expect(addedAccount).toBeTruthy()
      expect(addedAccount.id).toBeTruthy()
      expect(addedAccount.name).toBe('any_name')
      expect(addedAccount.email).toBe('any_email@mail.com')
      expect(addedAccount.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('wrong_mail@mail.com')

      expect(account).toBeFalsy()
    })
  })
})
