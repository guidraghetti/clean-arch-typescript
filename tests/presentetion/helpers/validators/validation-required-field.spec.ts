import { MissingParamError } from '../../../../src/presentetion/errors'
import { ValidationRequiredField } from '../../../../src/presentetion/helpers/validators/validation-required-field'

describe('Validation Required Field', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = new ValidationRequiredField('any_field')

    const validateError = sut.validate({ name: 'any_name' })

    expect(validateError).toEqual(new MissingParamError('any_field'))
  })
})
