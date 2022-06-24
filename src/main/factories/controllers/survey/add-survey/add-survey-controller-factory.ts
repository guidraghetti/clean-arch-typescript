import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddSurveyFactory } from '@/main/factories/usecases'
import { makeAddSurveyValidationFactory } from './add-survey-validation-factory'

export const makeAddSurveyControllerFactory = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidationFactory(), makeDbAddSurveyFactory())

  return makeLogControllerDecorator(controller)
}
