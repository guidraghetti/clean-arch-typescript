import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hashed_password'
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct password', async () => {
    const bcryptSalt = 12
    const sut = new BcryptAdapter(bcryptSalt)
    jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(bcrypt.hash).toHaveBeenCalledWith('any_value', bcryptSalt)
  })

  test('Should return hashed password on success', async () => {
    const bcryptSalt = 12
    const sut = new BcryptAdapter(bcryptSalt)
    const hashedPassword = await sut.encrypt('any_value')

    expect(hashedPassword).toBe('hashed_password')
  })
})
