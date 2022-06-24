import { Authentication, AuthenticationModel } from '@/domain/usecases'
import { HashCompare, Encrypter, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly tokenGenerator: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account) {
      const isValidHash = await this.hashCompare.compare(authentication.password, account.password)

      if (isValidHash) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
