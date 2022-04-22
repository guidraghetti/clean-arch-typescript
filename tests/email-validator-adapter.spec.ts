import validator from 'validator'
import { EmailValidatorAdapter } from '../src/utils/email-validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('should return false if EmailValidator return false', () => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValidEmail = sut.isValid('invalid_mail')

    expect(isValidEmail).toBe(false)
  })

  test('should return true if EmailValidator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValidEmail = sut.isValid('valid_mail@mail.com')

    expect(isValidEmail).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
