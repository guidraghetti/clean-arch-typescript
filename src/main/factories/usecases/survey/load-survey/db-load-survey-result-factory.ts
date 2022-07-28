import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyMongoRepository, SurveyResultMongoRepository } from '@/infra/db'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const surveyResultMongoRepository = new SurveyResultMongoRepository()

  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
