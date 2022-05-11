import { DbAddAccount } from '../../../src/data/usecases/add-account/db-add-account'
import { AccountModel, Hasher, AddAccountRepository, AddAccountModel } from '../../../src/data/usecases/add-account/db-add-account-protocols'

const makeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeEncypter = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  const hasherStub = new HasherStub()

  return hasherStub
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }

  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const hasherStub = makeEncypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const accountData = makeAccountData()

    const hasherSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    const accountData = makeAccountData()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct user data', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = makeAccountData()

    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)

    await expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('should throw if addACcountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = makeAccountData()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should DbAddAccount return success', async () => {
    const { sut } = makeSut()
    const accountData = makeAccountData()

    const account = await sut.add(accountData)

    expect(account).toEqual(makeFakeAccount())
  })
})
