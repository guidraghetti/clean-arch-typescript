import { LoadSurveysController } from '@/presentation/controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogControllerDecorator(controller)
}
