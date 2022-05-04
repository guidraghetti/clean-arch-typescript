import { ValidationRequiredField } from '../../presentetion/helpers/validation-required-field'
import { Validation } from '../../presentetion/helpers/validators/validation'
import { ValidationComposite } from '../../presentetion/helpers/validators/validation-composite'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new ValidationRequiredField(field))
  }
  return new ValidationComposite(validations)
}
