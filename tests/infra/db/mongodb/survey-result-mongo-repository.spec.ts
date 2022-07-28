import { Collection } from 'mongodb'
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
      answer: 'any_answer'
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
      const surveyResult = await sut.save({
        surveyId: survey.id, accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      // expect(surveyResult.answers[0].count).toBe(1)
      // expect(surveyResult.answers[0].percent).toBe(100)
    })

    // test('Should update survey result if its not new', async () => {
    //   const sut = makeSut()
    //   const survey = await makeSurvey()
    //   const account = await makeAccount()
    //   await surveyResultCollection.insertOne({
    //     surveyId: new ObjectId(survey.id), accountId: account.id, answer: survey.answers[0].answer, createdAt: new Date()
    //   })
    //   const surveyResult = await sut.save({
    //     surveyId: survey.id, accountId: account.id, answer: survey.answers[1].answer, createdAt: new Date()
    //   })

    //   expect(surveyResult).toBeTruthy()
    //   expect(surveyResult.surveyId).toEqual(survey.id)
    //   expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
    //   expect(surveyResult.answers[0].count).toBe(1)
    //   expect(surveyResult.answers[0].percent).toBe(100)
    // })
  })
})
