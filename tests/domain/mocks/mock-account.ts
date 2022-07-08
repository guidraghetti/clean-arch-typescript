import { AccountModel } from '@/domain/models/account'
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'

export const mockFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockFakeAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockFakeAuthenticantion = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
