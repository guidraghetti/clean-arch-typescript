import { LoadSurveyResult } from '@/domain/usecases/survey/load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/protocols'
import { SurveyModel } from '../../../../domain/models/survey'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  private makeEmptyResult (survey: SurveyModel): SurveyResultModel {
    return {
      surveyId: survey.id,
      question: survey.question,
      createdAt: survey.createdAt,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }))
    }
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = this.makeEmptyResult(survey)
    }

    return surveyResult
  }
}
