import { LoadSurveys } from '@/domain/usecases'
import { mockFakeSurveyModels } from '../../domain/mocks'
import { SurveyModel } from '@/domain/models/survey'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockFakeSurveyModels()
    }
  }

  return new LoadSurveysStub()
}
