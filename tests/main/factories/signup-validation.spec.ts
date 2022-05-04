import { makeSignupValidation } from '../../../src/main/factories/signup-validation'
import { ValidationRequiredField } from '../../../src/presentetion/helpers/validation-required-field'
import { ValidationComposite } from '../../../src/presentetion/helpers/validators/validation-composite'
import { Validation } from '../../../src/presentetion/helpers/validators/validation'

jest.mock('../../../src/presentetion/helpers/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new ValidationRequiredField(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
