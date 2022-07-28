import { Collection, ObjectId } from 'mongodb'
import { SurveyResultMongoRepository, MongoHelper } from '@/infra/db'
import { SurveyModel } from '@/domain/models/survey'
import { MONGO_URL } from '@/main/config/constants'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const insertSurvey = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer_1'
    },
    {
      answer: 'any_answer_2'
    },
    {
      answer: 'any_answer_3'
    }],
    createdAt: new Date()
  })

  return surveyCollection.findOne({ _id: insertSurvey.insertedId }) as any
}

const makeAccount = async (): Promise<AccountModel> => {
  const insertAccount = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  return accountCollection.findOne({ _id: insertAccount.insertedId }) as any
}

describe('SurveyResultMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = MongoHelper.getCollection('surveysResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })

  describe('save', () => {
    test('Should add survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      await sut.save({
        surveyId: survey.id, accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
      })

      const surveyResult = await surveyResultCollection.findOne({
        surveyId: survey.id, accountId: account.id
      })

      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
      })
      await sut.save({
        surveyId: survey.id, accountId: account.id, answer: survey.answers[1].answer, createdAt: new Date()
      })

      const surveyResult = await surveyResultCollection.find({
        surveyId: survey.id, accountId: account.id
      }).toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  // describe('loadBySurveyId', () => {
  //   test('Should load survey result', async () => {
  //     const sut = makeSut()
  //     const survey = await makeSurvey()
  //     const account = await makeAccount()
  //     await surveyResultCollection.insertMany([{
  //       surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
  //     },
  //     {
  //       surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
  //     },
  //     {
  //       surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[1].answer, createdAt: new Date()
  //     },
  //     {
  //       surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[1].answer, createdAt: new Date()
  //     }])
  //     const surveyResult = await sut.loadBySurveyId(survey.id)

  //     expect(surveyResult).toBeTruthy()
  //     expect(surveyResult.surveyId).toEqual(survey.id)
  //     expect(surveyResult.answers[0].count).toBe(2)
  //     expect(surveyResult.answers[0].percent).toBe(50)
  //     expect(surveyResult.answers[1].count).toBe(2)
  //     expect(surveyResult.answers[1].percent).toBe(50)
  //     expect(surveyResult.answers[2].count).toBe(0)
  //     expect(surveyResult.answers[2].percent).toBe(0)
  //   })
  // })
})
