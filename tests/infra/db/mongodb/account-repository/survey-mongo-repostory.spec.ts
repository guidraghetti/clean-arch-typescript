import { Collection } from 'mongodb'
import { MongoHelper } from '../../../../../src/infra/db'
import { SurveyMongoRepository } from '../../../../../src/infra/db/mongodb/survey/survey-mongo-repostory'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await surveyCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
  })

  test('Should return an survey on success', async () => {
    const sut = makeSut()

    await sut.add({
      question: 'any_question',
      answers: [
        { image: 'any_image', answer: 'any_answer' },
        { answer: 'other_answer' }
      ]
    })

    const survey = surveyCollection.findOne({ question: 'any_question' })

    expect(survey).toBeTruthy()
  })
})
