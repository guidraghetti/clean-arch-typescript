import { InvalidParamError } from '../../errors'
import { Validation } from '../../controller/protocols/validation'

export class ValidationCompareField implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate (value: any): Error {
    if (value[this.field] !== value[this.fieldToCompare]) {
      return new InvalidParamError(this.field)
    }
  }
}
