import { LoadAccountByToken } from '@/domain/usecases'
import { mockFakeAccountModel } from '../../domain/mocks'
import { AccountModel } from '@/domain/models/account'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel> {
      return mockFakeAccountModel()
    }
  }

  return new LoadAccountByTokenStub()
}
