import { LoadAccountByEmailRepository, Hasher, AddAccountRepository } from '@/data/protocols'
import { DbAddAccount } from '@/data/usecases'
import { mockFakeAccountModel, mockFakeAccountParams, throwError } from '../../domain/mocks'
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepositoryStub } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepositoryStub()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
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
    const accountData = mockFakeAccountParams()

    const hasherSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    const accountData = mockFakeAccountParams()

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct user data', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = mockFakeAccountParams()

    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)

    await expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('should throw if addACcountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const accountData = mockFakeAccountParams()

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)

    const accountPromise = sut.add(accountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('should DbAddAccount return success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockFakeAccountParams())

    expect(account).toEqual(mockFakeAccountModel())
  })

  test('should DbAddAccount return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockFakeAccountModel()))
    const account = await sut.add(mockFakeAccountParams())

    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.add(mockFakeAccountParams())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
