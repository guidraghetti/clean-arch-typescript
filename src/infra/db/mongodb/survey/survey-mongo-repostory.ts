import { AddSurveyRepository } from '@/data/protocols'
import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveyRepository {
  async add (survey: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(survey)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()

    return surveys as any
  }
}
