import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/controller/protocols'

export class ValidationEmail implements Validation {
  constructor (
    private readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (value: any): Error {
    const emailIsValid = this.emailValidator.isValid(value[this.field])

    if (!emailIsValid) {
      return new InvalidParamError(this.field)
    }
  }
}
