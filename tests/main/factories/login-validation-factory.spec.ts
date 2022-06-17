import { makeLoginValidation } from '@/main/factories/controllers'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { ValidationRequiredField, ValidationEmail, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

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
