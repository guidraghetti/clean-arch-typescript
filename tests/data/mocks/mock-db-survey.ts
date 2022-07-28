import { AddSurveyParams, SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'
import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveyRepository, LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'
import { mockFakeSurveyModel, mockFakeSurveyModels, mockSaveSurveyResultModel } from '../../domain/mocks'
import { SurveyModel } from '@/domain/models/survey'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyParams): Promise<void> {
      ''
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<any> {
      return mockFakeSurveyModel()
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return mockFakeSurveyModels()
    }
  }

  return new LoadSurveyRepositoryStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyRepositoryStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSaveSurveyResultModel()
    }
  }

  return new SaveSurveyRepositoryStub()
}

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
      ''
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return mockSaveSurveyResultModel()
    }
  }

  return new LoadSurveyResultRepositoryStub()
}
