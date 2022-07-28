import { Authentication, AuthenticationParams, AddAccount } from '@/domain/usecases'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controller/login/signup/signup-controller'
import { ServerError, MissingParamError } from '@/presentation/errors'
import { UniqueError } from '@/presentation/errors/unique-error'
import { serverError, success, forbidden, badRequest } from '@/presentation/helpers/http/http-helper'
import { mockAddAccount, mockValidation } from '../mocks'

const makeAuthentication = (): any => {
  class AuthenticationStub implements Authentication {
    async auth (AuthenticationParams: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = makeAuthentication()

  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('Signup Controller', () => {
  test('sould success in addAccount', async () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = mockRequest()

    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(httpRequest)

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('sould return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = mockRequest()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('sould return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }))
  })

  test('sould return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = mockRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(forbidden(new UniqueError('any_email@mail.com')))
  })

  test('sould call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = mockRequest()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toBeCalledWith(httpRequest.body)
  })

  test('sould return 400 if Validation Returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = mockRequest()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(mockRequest())

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
