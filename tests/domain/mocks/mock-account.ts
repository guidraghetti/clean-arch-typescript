import { AccountModel } from '@/domain/models/account'
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'

export const mockFakeAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockFakeAccountWithTokenParams = (): AddAccountParams => Object.assign({}, mockFakeAccountParams(), {
  accessToken: 'any_token'
})

export const mockFakeAccountWithRoleParams = (): AddAccountParams => Object.assign({}, mockFakeAccountWithTokenParams(), {
  role: 'admin'
})

export const mockFakeAccountModel = (): AccountModel => Object.assign({}, mockFakeAccountParams(), {
  id: 'any_id'
})

export const mockFakeAuthenticantion = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
