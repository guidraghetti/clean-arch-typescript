import jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/criptography'

const makeSut = (): JwtAdapter => new JwtAdapter('secret')

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  describe('encrypt', () => {
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

    test('should throw if sign throws', async () => {
      const sut = makeSut()

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.encrypt('any_id')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt', () => {

  })
})
