import { LoadSurveysController } from '@/presentation/controller/survey/load-survey/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-survey/db-load-surves-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogControllerDecorator(controller)
}
