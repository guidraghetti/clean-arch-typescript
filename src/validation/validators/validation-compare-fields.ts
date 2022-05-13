import { InvalidParamError } from '../../presentetion/errors'
import { Validation } from '../../presentetion/controller/protocols'

export class ValidationCompareField implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (value: any): Error {
    if (value[this.field] !== value[this.fieldToCompare]) {
      return new InvalidParamError(this.field)
    }
  }
}
