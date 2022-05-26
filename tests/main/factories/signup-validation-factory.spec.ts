import { makeSignupValidation } from '../../../src/main/factories/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { EmailValidator } from '../../../src/validation/protocols/email-validator'
import { ValidationRequiredField, ValidationCompareField, ValidationEmail, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new ValidationRequiredField(field))
    }
    validations.push(new ValidationCompareField('password', 'passwordConfirmation'))
    validations.push(new ValidationEmail('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
