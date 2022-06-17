import { LoadAccountByEmailRepository, Hasher, AddAccountRepository } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases'

const makeAccountData = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
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

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeEncypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const accountData = makeAccountData()

    const hasherSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    const accountData = makeAccountData()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct user data', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = makeAccountData()

    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)

    await expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('should throw if addACcountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = makeAccountData()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should DbAddAccount return success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeAccountData())

    expect(account).toEqual(makeFakeAccount())
  })

  test('should DbAddAccount return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const account = await sut.add(makeAccountData())

    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.add(makeAccountData())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
