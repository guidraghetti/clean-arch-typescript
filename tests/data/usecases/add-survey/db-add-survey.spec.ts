import { AddSurveyRepository } from '../../../../src/data/protocols/db/survey/add-survey-repository'
import { DbAddSurvey } from '../../../../src/data/usecases'
import { AddSurveyModel } from '../../../../src/domain/usecases/add-survey'

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (survey: AddSurveyModel): Promise<void> {
      ''
    }
  }

  return new AddSurveyRepositoryStub()
}

interface sutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}
const makeSut = (): sutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    await sut.add(makeFakeSurvey())

    expect(addSpy).toHaveBeenCalledWith(makeFakeSurvey())
  })
})
