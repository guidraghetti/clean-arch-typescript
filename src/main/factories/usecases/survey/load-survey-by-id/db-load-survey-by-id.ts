import { LoadSurveyById } from '@/domain/usecases'
import { SurveyMongoRepository } from '@/infra/db'
import { DbLoadSurveyById } from '@/data/usecases'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveyById(surveyMongoRepository)
}
