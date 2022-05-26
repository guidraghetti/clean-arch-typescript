import { Controller } from '../../../../../presentation/protocols'
import { AddSurveyController } from '../../../../../presentation/controller/survey'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddSurveyFactory } from '../../../usecases/add-survey/db-add-survey-factory'
import { makeAddSurveyValidationFactory } from './add-survey-validation-factory'

export const makeAddSurveyControllerFactory = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidationFactory(), makeDbAddSurveyFactory())

  return makeLogControllerDecorator(controller)
}
