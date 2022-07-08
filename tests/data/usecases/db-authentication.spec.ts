import { LoadAccountByEmailRepository, HashCompare, Encrypter, UpdateAccessTokenRepository } from '@/data/protocols'
import { DbAuthentication } from '@/data/usecases'
import { mockFakeAuthenticantion, throwError } from '../../domain/mocks'
import { mockEncrypterStub, mockHashCompareStub, mockLoadAccountByEmailRepositoryStub } from '../mocks'

const makeUpdateAccessTokenRepositoryStub = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      ''
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}
type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateAccessTokenRepotitoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepositoryStub()
  const hashCompareStub = mockHashCompareStub()
  const encrypterStub = mockEncrypterStub()
  const updateAccessTokenRepotitoryStub = makeUpdateAccessTokenRepositoryStub()

  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub, encrypterStub, updateAccessTokenRepotitoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepotitoryStub
  }
}

describe('DB Authentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthenticantion())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)

    const authPromise = sut.auth(mockFakeAuthenticantion())

    await expect(authPromise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const accessToken = await sut.auth(mockFakeAuthenticantion())

    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()

    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockFakeAuthenticantion())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError)

    const promise = sut.auth(mockFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const acessToken = await sut.auth(mockFakeAuthenticantion())

    expect(acessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, encrypterStub } = makeSut()

    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthenticantion())

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)

    const promise = sut.auth(mockFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })

  test('Should call auth with correct values', async () => {
    const { sut } = makeSut()

    const accesToken = await sut.auth(mockFakeAuthenticantion())

    expect(accesToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepotitoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepotitoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthenticantion())

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if u UpdateAccessTokenRepository', async () => {
    const { sut, updateAccessTokenRepotitoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepotitoryStub, 'updateAccessToken').mockImplementationOnce(throwError)

    const promise = sut.auth(mockFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })
})
