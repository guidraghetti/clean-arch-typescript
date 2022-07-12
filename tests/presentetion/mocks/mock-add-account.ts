import { mockFakeAccountModel } from '../../domain/mocks'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockFakeAccountModel()

      return fakeAccount
    }
  }
  return new AddAccountStub()
}
