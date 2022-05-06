import { makeLoginValidation } from '../../../src/main/factories/login/login-validation'
import { EmailValidator } from '../../../src/presentetion/controller/protocols/email-validator'
import { Validation } from '../../../src/presentetion/controller/protocols/validation'
import { ValidationComposite, ValidationEmail, ValidationRequiredField } from '../../../src/presentetion/helpers/validators'

jest.mock('../../../src/presentetion/helpers/validators/validation-composite')

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
