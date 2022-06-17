import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationRequiredField, ValidationCompareField, ValidationEmail } from '@/validation/validators'
import { EmailValidatorAdapter } from '../../../../adapters'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new ValidationRequiredField(field))
  }
  validations.push(new ValidationCompareField('password', 'passwordConfirmation'))
  validations.push(new ValidationEmail('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
