import { MissingParamError } from '../../errors'
import { Validation } from '../../controller/protocols/validation'

export class ValidationRequiredField implements Validation {
  constructor (private readonly field: string) {}

  validate (value: any): Error {
    if (!value[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
