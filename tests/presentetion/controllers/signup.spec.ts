import { EmailValidator } from '../../../src/presentetion/controller/protocols/email-validator'
import { SignUpController } from '../../../src/presentetion/controller/signup'
import { InvalidParamError } from '../../../src/presentetion/errors/invalid-param-error'
import { MissingParamError } from '../../../src/presentetion/errors/missing-param-error'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Signup Controller', () => {
  test('sould return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'mockEmail@email.com',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('sould return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'moockName',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('sould return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'moockName',
        email: 'mockEmail@email.com',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('sould return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'moockName',
        email: 'mockEmail@email.com',
        password: 'mockPassword'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('sould return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'moockName',
        email: 'mockWrongEmail',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
