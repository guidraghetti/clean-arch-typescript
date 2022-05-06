import { MissingParamError } from '../../../../src/presentetion/errors'
import { ValidationRequiredField } from '../../../../src/presentetion/helpers/validators/validation-required-field'

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
