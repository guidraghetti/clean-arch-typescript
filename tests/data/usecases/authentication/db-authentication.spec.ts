import { HashCompare } from '../../../../src/data/protocols/criptography/hash-compare'
import { Encrypter } from '../../../../src/data/protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '../../../../src/data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../src/data/protocols/db/update-access-token-repository'
import { DbAuthentication } from '../../../../src/data/usecases/authentication/db-authentication'
import { AccountModel } from '../../../../src/domain/models/account'
import { AuthenticationModel } from '../../../../src/domain/usecases/authentication'

const makeFakeRequest = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hash_password'
})

const makeFakeAuthenticantion = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account = makeFakeRequest()

      return account
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompareStub = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashCompareStub()
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepositoryStub = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      ''
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}
interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateAccessTokenRepotitoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const hashCompareStub = makeHashCompareStub()
  const encrypterStub = makeEncrypterStub()
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

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthenticantion())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))

    const authPromise = sut.auth(makeFakeAuthenticantion())

    await expect(authPromise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)

    const accessToken = await sut.auth(makeFakeAuthenticantion())

    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()

    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthenticantion())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hash_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.auth(makeFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const acessToken = await sut.auth(makeFakeAuthenticantion())

    expect(acessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, encrypterStub } = makeSut()

    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthenticantion())

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.auth(makeFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })

  test('Should call auth with correct values', async () => {
    const { sut } = makeSut()

    const accesToken = await sut.auth(makeFakeAuthenticantion())

    expect(accesToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepotitoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepotitoryStub, 'update')
    await sut.auth(makeFakeAuthenticantion())

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if u UpdateAccessTokenRepository', async () => {
    const { sut, updateAccessTokenRepotitoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepotitoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.auth(makeFakeAuthenticantion())

    await expect(promise).rejects.toThrow()
  })
})
