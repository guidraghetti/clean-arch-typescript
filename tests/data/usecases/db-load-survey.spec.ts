import { LoadSurveyRepository } from '@/data/protocols'
import { DbLoadSurveys } from '@/data/usecases'
import MockDate from 'mockdate'
import { mockFakeSurveyModels } from '../../domain/mocks'
import { mockLoadSurveysRepository } from '../mocks'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveyRepositoryStub)

  return {
    sut,
    loadSurveyRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSuerveyRepository', async () => {
    const { sut } = makeSut()
    const loadAllSpy = jest.spyOn(sut, 'load')

    await sut.load()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('should return surveys on success', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()

    expect(surveys).toEqual(mockFakeSurveyModels())
  })

  test('should throw if LoadSurveysRepostiroy throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
