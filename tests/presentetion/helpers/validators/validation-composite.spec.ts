import { MissingParamError } from '../../../../src/presentetion/errors'
import { Validation } from '../../../../src/presentetion/helpers/validators/validation'
import { ValidationComposite } from '../../../../src/presentetion/helpers/validators/validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])

  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const validationCompositeError = sut.validate({ field: 'any_value' })
    expect(validationCompositeError).toEqual(new MissingParamError('field'))
  })
})
