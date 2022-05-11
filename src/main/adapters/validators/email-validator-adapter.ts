import validator from 'validator'
import { EmailValidator } from '../../../presentetion/controller/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
