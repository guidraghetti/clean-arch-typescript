import { MissingParamError } from '../../src/presentation/errors'
import { ValidationRequiredField } from '../../src/validation/validators'

const makeSut = (): ValidationRequiredField => {
  return new ValidationRequiredField('field')
}

describe('Validation Required Field', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = makeSut()

    const validateError = sut.validate({ name: 'any_name' })

    expect(validateError).toEqual(new MissingParamError('field'))
  })

  test('should Validation execute with success', () => {
    const sut = makeSut()

    const validateError = sut.validate({ field: 'any_name' })

    expect(validateError).toBeFalsy()
  })
})
