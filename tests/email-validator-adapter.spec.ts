import { EmailValidatorAdapter } from '../src/utils/email-validator'

describe('EmailValidator Adapter', () => {
  test('should return false if EmailValidator return false', () => {
    const sut = new EmailValidatorAdapter()
    const emailIsValid = sut.isValid('mockWorngEmail')

    expect(emailIsValid).toBe(false)
  })
})
