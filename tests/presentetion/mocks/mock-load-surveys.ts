import { LoadSurveyById, LoadSurveyResult, LoadSurveys } from '@/domain/usecases'
import { mockFakeSurveyModel, mockFakeSurveyModels, mockSaveSurveyResultModel } from '../../domain/mocks'
import { SurveyModel } from '@/domain/models/survey'
import { SurveyResultModel } from '../../domain/models/survey-result'

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

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return mockSaveSurveyResultModel()
    }
  }

  return new LoadSurveyResultStub()
}
