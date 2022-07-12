import { Authentication, AuthenticationParams } from '@/domain/usecases'

export const mockAuthentication = (): any => {
  class AuthenticationStub implements Authentication {
    async auth (AuthenticationParams: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}
