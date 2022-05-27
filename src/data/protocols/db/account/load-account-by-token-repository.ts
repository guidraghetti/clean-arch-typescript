import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByTokenRepository {
  loadByTOken: (token: string, role?: string) => Promise<AccountModel>
}
