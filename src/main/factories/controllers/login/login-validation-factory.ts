import { Validation } from '../../../../presentetion/controller/protocols'
import { ValidationComposite, ValidationEmail, ValidationRequiredField } from '../../../../validation/validators'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new ValidationRequiredField(field))
  }
  validations.push(new ValidationEmail('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
