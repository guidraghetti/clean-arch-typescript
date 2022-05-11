import { Validation } from '../../controller/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: Validation[]) {
    this.validators = validators
  }

  validate (value: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(value)
      if (error) {
        return error
      }
    }
  }
}
