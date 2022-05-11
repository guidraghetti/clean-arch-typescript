import bcrypt from 'bcryptjs'
import { BcryptAdapter } from '../../../src/infra/criptography/bcrypt-adapter'

const bcryptSalt = 12

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return 'hashed_password'
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(bcryptSalt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct password', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    expect(bcrypt.hash).toHaveBeenCalledWith('any_value', bcryptSalt)
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

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')

    expect(bcrypt.compare).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()
    const hashedPassword = await sut.compare('any_value', 'any_hash')

    expect(hashedPassword).toBe(true)
  })
})
