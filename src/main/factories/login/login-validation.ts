import { ValidationRequiredField } from '../../../presentetion/helpers/validators/validation-required-field'
import { Validation } from '../../../presentetion/helpers/validators/validation'
import { ValidationComposite } from '../../../presentetion/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { ValidationEmail } from '../../../presentetion/helpers/validators/validation-email'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new ValidationRequiredField(field))
  }
  validations.push(new ValidationEmail('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
