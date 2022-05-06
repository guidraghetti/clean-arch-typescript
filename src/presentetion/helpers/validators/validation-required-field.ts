import { MissingParamError } from '../../errors'
import { Validation } from '../../controller/protocols/validation'

export class ValidationRequiredField implements Validation {
  private readonly field: string

  constructor (field: string) {
    this.field = field
  }

  validate (value: any): Error {
    if (!value[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
