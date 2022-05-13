import { Validation } from '../../presentetion/controller/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: Validation[]) {}

  validate (value: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(value)
      if (error) {
        return error
      }
    }
  }
}
