import validator from 'validator'
import { EmailValidatorAdapter } from '../../../src/main/adapters'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('should return false if EmailValidator return false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValidEmail = sut.isValid('invalid_mail')

    expect(isValidEmail).toBe(false)
  })

  test('should return true if EmailValidator return true', () => {
    const sut = makeSut()
    const isValidEmail = sut.isValid('valid_mail@mail.com')

    expect(isValidEmail).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
