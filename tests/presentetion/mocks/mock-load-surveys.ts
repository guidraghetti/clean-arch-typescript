import { LoadSurveyById, LoadSurveys } from '@/domain/usecases'
import { mockFakeSurveyModel, mockFakeSurveyModels } from '../../domain/mocks'
import { SurveyModel } from '@/domain/models/survey'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockFakeSurveyModels()
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockFakeSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}
