import { SaveSurveyResultRepository } from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save ({ surveyId, accountId, answer, createdAt }: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const mongoResponse = await surveyCollection.findOneAndUpdate({ surveyId, accountId }, {
      $set: {
        answer,
        createdAt
      }
    }, { upsert: true, returnDocument: 'after' })
    return MongoHelper.map(mongoResponse.value)
  }
}
