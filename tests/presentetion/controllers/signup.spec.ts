import { AccountModel } from '../../../src/domain/models/account'
import { AddAccount, AddAccountModel } from '../../../src/domain/usecases/add-account'
import { EmailValidator } from '../../../src/presentetion/controller/signup/signup-protocols'
import { SignUpController } from '../../../src/presentetion/controller/signup/signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../../src/presentetion/errors'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('Signup Controller', () => {
  test('sould return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('sould return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('sould return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        passwordConfirmation: 'mockPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('sould return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('sould return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockWrongEmail',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
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
    sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenLastCalledWith('mockEmail@email.com')
  })

  test('sould return 500 if EmailValidator throws internal error', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockWrongEmail',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('sould return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockWrongPasswordConfirmation'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation is different from password'))
  })

  test('sould success in addAccount', async () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }

    const addAccountSpy = jest.spyOn(addAccountStub, 'add')

    sut.handle(httpRequest)

    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'mockName',
      email: 'mockEmail@email.com',
      password: 'mockPassword'
    })
  })

  test('sould return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword'
      }
    }

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
