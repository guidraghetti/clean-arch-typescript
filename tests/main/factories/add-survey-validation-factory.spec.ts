import { makeAddSurveyValidationFactory } from '../../../src/main/factories/controllers/survey/add-survey/add-survey-validation-factory'
import { Validation } from '../../../src/presentation/protocols'
import { ValidationComposite, ValidationRequiredField } from '../../../src/validation/validators'

jest.mock('../../../src/validation/validators/validation-composite')

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
