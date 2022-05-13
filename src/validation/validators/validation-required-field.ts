import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/controller/protocols'

export class ValidationRequiredField implements Validation {
  constructor (private readonly field: string) {}

  validate (value: any): Error {
    if (!value[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
