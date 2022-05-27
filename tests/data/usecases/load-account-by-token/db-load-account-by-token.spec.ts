import { Decrypter } from '../../../../src/data/protocols/criptography/decrypter'
import { DbLoadAccountByToken } from '../../../../src/data/usecases/load-account-by-token/db-load-account-by-token'

const makeDectypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }

  return new DecrypterStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDectypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('LoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const accessToken = 'any_token'
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load(accessToken)

    expect(decrypterSpy).toHaveBeenCalledWith(accessToken)
  })
})
