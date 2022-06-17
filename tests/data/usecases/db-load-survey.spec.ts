import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surverys'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  }]
}

const makeLoadSurveysStub = (): LoadSurveyRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }

  return new LoadSurveyRepositoryStub()
}
type SutTypes = {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveysStub()
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

    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('should throw if LoadSurveysRepostiroy throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
