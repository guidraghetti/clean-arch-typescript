import { DbAddSurvey } from '../../../../../data/usecases'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repostory'

export const makeDbAddSurveyFactory = (): DbAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbAddSurvey(surveyMongoRepository)
}
