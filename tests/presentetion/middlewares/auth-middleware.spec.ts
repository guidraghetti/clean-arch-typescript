import { AccessDeniedError } from '../../../src/presentation/errors'
import { forbidden } from '../../../src/presentation/helpers/http/http-helper'
import { AuthMiddleware } from '../../../src/presentation/middlewares/auth-middleware'
import { HttpResponse } from '../../../src/presentation/protocols'

interface sutTypes {
  sut: AuthMiddleware
}

const makeSut = (): sutTypes => ({
  sut: new AuthMiddleware()
})

describe('Auth Middleware', () => {
  test('Should Return 403 if no x-access-token is provided in header', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
