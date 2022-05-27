import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, this.secret)
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return null
  }
}
