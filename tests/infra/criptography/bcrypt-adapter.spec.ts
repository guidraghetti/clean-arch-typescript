import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/criptography/bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct password', async () => {
    const bcryptSalt = 12
    const sut = new BcryptAdapter(bcryptSalt)
    jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(bcrypt.hash).toHaveBeenCalledWith('any_value', bcryptSalt)
  })
})
