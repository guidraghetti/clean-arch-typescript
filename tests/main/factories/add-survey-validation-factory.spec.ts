import { makeAddSurveyValidationFactory } from '@/main/factories/controllers/survey/add-survey/add-survey-validation-factory'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationRequiredField } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Add Survey Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidationFactory()

    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new ValidationRequiredField(field))
    }

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
