import { makeLoginValidation } from '@/main/factories/controllers'
import { Validation } from '@/presentation/protocols'
import { ValidationRequiredField, ValidationEmail, ValidationComposite } from '@/validation/validators'
import { mockEmailValidator } from '../../validation/mocks'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call LoginValidation with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new ValidationRequiredField(field))
    }
    validations.push(new ValidationEmail('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
