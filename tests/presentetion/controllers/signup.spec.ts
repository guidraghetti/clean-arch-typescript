import { AccountModel } from '../../../src/domain/models/account'
import { AddAccount, AddAccountModel } from '../../../src/domain/usecases/add-account'
import { EmailValidator, HttpRequest } from '../../../src/presentetion/controller/signup/signup-protocols'
import { SignUpController } from '../../../src/presentetion/controller/signup/signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../../src/presentetion/errors'
import { badRequest, serverError, success } from '../../../src/presentetion/helpers/http-helper'
import { Validation } from '../../../src/presentetion/helpers/validators/validation'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
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
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const validationStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, addAccountStub, validationStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub
  }
}

describe('Signup Controller', () => {
  test('sould return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = makeFakeRequest()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('sould call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenLastCalledWith('mockEmail@email.com')
  })

  test('sould return 500 if EmailValidator throws internal error', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = makeFakeRequest()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('sould success in addAccount', async () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = makeFakeRequest()

    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(httpRequest)

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
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

    expect(httpResponse).toEqual(success(makeFakeAccount()))
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
})
