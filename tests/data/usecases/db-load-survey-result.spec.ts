import { DbLoadSurveyResult } from '@/data/usecases/'
import { LoadSurveyResultRepository } from '@/data/protocols'
import { mockLoadSurveyResultRepository } from '../mocks'
import { throwError } from '../../domain/mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepository = mockLoadSurveyResultRepository()
  return {
    sut: new DbLoadSurveyResult(loadSurveyResultRepository),
    loadSurveyResultRepository
  }
}

describe('DbLoadSurveyResult usecase', () => {
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
})
