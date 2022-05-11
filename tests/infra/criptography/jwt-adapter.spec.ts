import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/criptography/jwt-adapter/jwt-adapter'

const makeSut = (): JwtAdapter => new JwtAdapter('secret')

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()

    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sigin succes', async () => {
    const sut = makeSut()

    const token = await sut.encrypt('any_id')

    expect(token).toBe('any_token')
  })
})
