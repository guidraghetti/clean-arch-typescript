import { MissingParamError } from '../../../../src/presentetion/errors'
import { ValidationRequiredField } from '../../../../src/presentetion/helpers/validators/validation-required-field'

describe('Validation Required Field', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = new ValidationRequiredField('any_field')

    const validateError = sut.validate({ name: 'any_name' })

    expect(validateError).toEqual(new MissingParamError('any_field'))
  })

  test('should Validation execute with success', () => {
    const sut = new ValidationRequiredField('field')

    const validateError = sut.validate({ field: 'any_name' })

    expect(validateError).toBeFalsy()
  })
})
