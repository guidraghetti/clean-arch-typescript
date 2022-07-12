import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'
import { ValidationComposite } from '@/validation/validators'
import { mockValidation } from './mocks'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const validationCompositeError = sut.validate({ field: 'any_value' })
    expect(validationCompositeError).toEqual(new MissingParamError('field'))
  })

  test('Should return first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const validationCompositeError = sut.validate({ field: 'any_value' })
    expect(validationCompositeError).toEqual(new Error())
  })

  test('Should execute with success', () => {
    const { sut } = makeSut()

    const validationCompositeError = sut.validate({ field: 'any_value' })
    expect(validationCompositeError).toBeFalsy()
  })
})
