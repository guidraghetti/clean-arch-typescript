import { Decrypter, Encrypter, HashCompare, Hasher } from '@/data/protocols'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'any_password'
    }
  }

  const hasherStub = new HasherStub()

  return hasherStub
}

export const mockDectypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }

  return new DecrypterStub()
}

export const mockEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

export const mockHashCompareStub = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashCompareStub()
}
