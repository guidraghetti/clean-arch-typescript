import { ValidationRequiredField } from '../../presentetion/helpers/validators/validation-required-field'
import { Validation } from '../../presentetion/helpers/validators/validation'
import { ValidationComposite } from '../../presentetion/helpers/validators/validation-composite'
import { ValidationCompareField } from '../../presentetion/helpers/validators/compare-fields-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { ValidationEmail } from '../../presentetion/helpers/validators/validation-email'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new ValidationRequiredField(field))
  }
  validations.push(new ValidationCompareField('password', 'passwordConfirmation'))
  validations.push(new ValidationEmail('email',new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
