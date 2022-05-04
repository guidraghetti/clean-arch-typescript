import { EmailValidator } from '../../../../src/presentetion/controller/protocols/email-validator'
import { InvalidParamError } from '../../../../src/presentetion/errors'
import { ValidationEmail } from '../../../../src/presentetion/helpers/validators/validation-email'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: ValidationEmail
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new ValidationEmail('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Validation Email', () => {
  test('Should return an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })

    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('sould call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })

    expect(isValidSpy).toHaveBeenLastCalledWith('any_email@mail.com')
  })

  test('sould throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
