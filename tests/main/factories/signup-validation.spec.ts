import { makeSignupValidation } from '../../../src/main/factories/signup/signup-validation'
import { EmailValidator } from '../../../src/presentetion/controller/protocols/email-validator'
import { Validation } from '../../../src/presentetion/controller/protocols/validation'
import { ValidationRequiredField, ValidationCompareField, ValidationEmail, ValidationComposite } from '../../../src/presentetion/helpers/validators'

jest.mock('../../../src/presentetion/helpers/validators/validation-composite')

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
