import { AccountModel } from '../../../src/domain/models/account'
import { AddAccount, AddAccountModel } from '../../../src/domain/usecases/add-account'
import { HttpRequest } from '../../../src/presentetion/controller/signup/signup-controller-protocols'
import { SignUpController } from '../../../src/presentetion/controller/signup/signup-controller'
import { MissingParamError, ServerError } from '../../../src/presentetion/errors'
import { badRequest, serverError, success } from '../../../src/presentetion/helpers/http/http-helper'
import { Validation } from '../../../src/presentetion/controller/protocols/validation'
import { Authentication, AuthenticationModel } from '../../../src/domain/usecases/authentication'

const makeAuthentication = (): any => {
  class AuthenticationStub implements Authentication {
    async auth (authenticationModel: AuthenticationModel): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()

      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}
interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
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
    const httpRequest = makeFakeRequest()

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
    const httpRequest = makeFakeRequest()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('sould return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }))
  })

  test('sould call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequest)

    expect(validateSpy).toBeCalledWith(httpRequest.body)
  })

  test('sould return 400 if Validation Returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeFakeRequest()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())

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

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
