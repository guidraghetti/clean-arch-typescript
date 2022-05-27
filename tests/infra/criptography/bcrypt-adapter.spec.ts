import bcrypt from 'bcryptjs'
import { BcryptAdapter } from '../../../src/infra/criptography'
import { BCRYPT_SALT } from '../../../src/main/config/constants'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return 'hashed_password'
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(BCRYPT_SALT)
}

describe('Bcrypt Adapter', () => {
  describe('hash', () => {
    test('Should call hash with correct password', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')

      expect(bcrypt.hash).toHaveBeenCalledWith('any_value', BCRYPT_SALT)
    })

    test('Should return hashed password on success', async () => {
      const sut = makeSut()
      const hashedPassword = await sut.hash('any_value')

      expect(hashedPassword).toBe('hashed_password')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.hash('any_value')

      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')

      expect(bcrypt.compare).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValidPassword = await sut.compare('any_value', 'any_hash')

      expect(isValidPassword).toBe(true)
    })

    test('Should return false when compare return false', async () => {
      const sut = makeSut()

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)

      const isValidPassword = await sut.compare('any_value', 'any_hash')

      expect(isValidPassword).toBe(false)
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.compare('any_value', 'any_hash')

      await expect(promise).rejects.toThrow()
    })
  })
})
