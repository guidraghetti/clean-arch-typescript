import { DbAddAccount } from '../../src/data/usecases/add-account/db-add-account'
import { AccountModel, Encrypter, AddAccountRepository, AddAccountModel } from '../../src/data/usecases/add-account/db-add-account-protocols'

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
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeEncypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  const encrypterStub = new EncrypterStub()

  return encrypterStub
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
  const encrypterStub = makeEncypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const accountData = makeAccountData()

    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    const accountData = makeAccountData()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

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

  test('should throw if DbAddAccount throws', async () => {
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
