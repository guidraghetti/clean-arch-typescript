import MockDate from 'mockdate'
import { DbLoadSurveyResult } from '@/data/usecases/'
import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/protocols'
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '../mocks'
import { mockSaveSurveyResultModel, throwError } from '../../domain/mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
  loadSurveyByIdRepository: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepository = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepository = mockLoadSurveyByIdRepository()

  return {
    sut: new DbLoadSurveyResult(loadSurveyResultRepository, loadSurveyByIdRepository),
    loadSurveyResultRepository,
    loadSurveyByIdRepository
  }
}

describe('DbLoadSurveyResult usecase', () => {
  beforeAll(() => MockDate.set(new Date()))

  afterAll(() => MockDate.reset())

  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId')
    await sut.load('any_survey_id')

    expect(loadSurveyByIdSpy).toHaveBeenLastCalledWith('any_survey_id')
  })

  test('Should throw if loadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()

    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockImplementationOnce(throwError)

    const promise = sut.load('any_survey_id')

    await expect(promise).rejects.toThrow()
  })

  test('Should return surveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResult = await sut.load('any_survey_id')

    expect(surveyResult).toEqual(mockSaveSurveyResultModel())
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepository, loadSurveyByIdRepository } = makeSut()

    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(null)

    await sut.load('any_survey_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should call LoadSurveyByIdRepository with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepository } = makeSut()

    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(null)

    await sut.load('any_survey_id')

    const surveyResult = await sut.load('any_survey_id')

    expect(surveyResult).toEqual(mockSaveSurveyResultModel())
  })
})
