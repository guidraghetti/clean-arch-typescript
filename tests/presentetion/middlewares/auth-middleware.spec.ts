import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockFakeAccountModel } from '../../domain/mocks'

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel> {
      return mockFakeAccountModel()
    }
  }

  return new LoadAccountByTokenStub()
}
type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should Return 403 if no x-access-token is provided in header', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should Return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse: HttpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should Return 200 if LoadAccountByToken returns account', async () => {
    const { sut } = makeSut()

    const httpResponse: HttpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(success({
      accountId: 'any_id'
    }))
  })

  test('Should Return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
