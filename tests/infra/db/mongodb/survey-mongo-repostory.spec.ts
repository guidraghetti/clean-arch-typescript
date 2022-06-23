import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repostory'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should return an survey on success', async () => {
      const sut = makeSut()

      await sut.add({
        question: 'any_question',
        answers: [
          { image: 'any_image', answer: 'any_answer' },
          { answer: 'other_answer' }
        ],
        createdAt: new Date()
      })

      const survey = surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            { image: 'any_image', answer: 'any_answer' },
            { answer: 'any_answer' }
          ],
          createdAt: new Date()
        },
        {
          question: 'other_question',
          answers: [
            { image: 'other_image', answer: 'other_answer' },
            { answer: 'other_answer' }
          ],
          createdAt: new Date()
        }
      ])
      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list', async () => {
      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById', () => {
    test('Should load survey by id on success', async () => {
      const mongoResponse = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        createdAt: new Date()
      })

      const sut = makeSut()
      const survey = await sut.loadById(mongoResponse.insertedId.toString())
      expect(survey).toBeTruthy()
    })
  })
})
