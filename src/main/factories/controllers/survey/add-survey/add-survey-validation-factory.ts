import { Validation } from '../../../../../presentation/controller/protocols'
import { ValidationComposite, ValidationRequiredField } from '../../../../../validation/validators'

export const makeAddSurveyValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['question', 'answers']) {
    validations.push(new ValidationRequiredField(field))
  }

  return new ValidationComposite(validations)
}
