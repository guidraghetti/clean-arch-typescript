import bcrypt from 'bcryptjs'
import { BcryptAdapter } from '../../../src/infra/criptography/bcrypt-adapter'

const bcryptSalt = 12

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return 'hashed_password'
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(bcryptSalt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct password', async () => {
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

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })
})
