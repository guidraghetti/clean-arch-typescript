import { Validation } from '../../../presentetion/controller/protocols/validation'
import { ValidationComposite, ValidationEmail, ValidationRequiredField } from '../../../presentetion/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new ValidationRequiredField(field))
  }
  validations.push(new ValidationEmail('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
