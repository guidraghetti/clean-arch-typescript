import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controller'
import { makeDbLoadSurveyById, makeDbSaveSurveyResultFactory } from '@/main/factories/usecases'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResultFactory())

  return makeLogControllerDecorator(controller)
}
