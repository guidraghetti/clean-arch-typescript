import { makeLoginValidation } from '../../../src/main/factories/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { EmailValidator } from '../../../src/validation/protocols/email-validator'
import { ValidationRequiredField, ValidationEmail, ValidationComposite } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call L with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new ValidationRequiredField(field))
    }
    validations.push(new ValidationEmail('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
