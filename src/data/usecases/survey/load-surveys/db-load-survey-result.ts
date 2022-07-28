import { LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyResultRepository } from '@/data/protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}
  async load (surveyId: string): Promise<SurveyResultModel> {
    return this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}
