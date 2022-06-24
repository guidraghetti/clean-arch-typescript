import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases'
import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from '@/data/protocols'
import { DbSaveSurveyResult } from '@/data/usecases'

const makeSaveSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  surveyId: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  createdAt: new Date()
})

const makeFakeSurveyResultData = (): Omit<SurveyResultModel, 'id'> => ({
  surveyId: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  createdAt: new Date()
})

const makeSaveSurveyRepository = (): SaveSurveyResult => {
  class SaveSurveyRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeSaveSurveyResult()
    }
  }

  return new SaveSurveyRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    saveSurveyResultRepositoryStub,
    sut
  }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => MockDate.set(new Date()))

  afterAll(() => MockDate.reset())

  test('Should call SaveSurveyRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSurveyResultData())

    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
  })

  test('Should throw if SaveSurveyRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSurveyResultData())
    expect(surveyResult).toEqual(makeSaveSurveyResult())
  })
})
