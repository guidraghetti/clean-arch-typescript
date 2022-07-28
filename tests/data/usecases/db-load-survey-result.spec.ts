import { DbLoadSurveyResult } from '@/data/usecases/'
import { LoadSurveyResultRepository } from '@/data/protocols'
import { mockLoadSurveyResultRepository } from '../mocks'

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
})
