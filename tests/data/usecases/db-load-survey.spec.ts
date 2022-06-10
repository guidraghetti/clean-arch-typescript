import { LoadSurveyRepository } from '../../../src/data/protocols/db/survey/load-survey-repository'
import { DbLoadSurveys } from '../../../src/data/usecases/load-surveys/db-load-surverys'
import { SurveyModel } from '../../../src/domain/models/survey'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
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
interface SutTypes {
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
})
