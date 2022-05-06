import { MissingParamError } from '../../../../src/presentetion/errors'
import { Validation } from '../../../../src/presentetion/helpers/validators/validation'
import { ValidationComposite } from '../../../../src/presentetion/helpers/validators/validation-composite'

describe('Validation Required Field', () => {
  test('Should return error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const validationCompositeError = sut.validate({ field: 'any_value' })
    expect(validationCompositeError).toEqual(new MissingParamError('field'))
  })
})
