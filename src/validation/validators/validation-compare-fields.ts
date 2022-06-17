import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

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
