import MockDate from 'mockdate'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { DbLoadSurveyById } from '@/data/usecases/'
import { mockFakeSurveyModel, throwError } from '../../domain/mocks'
import { mockLoadSurveyByIdRepository } from '../mocks'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => MockDate.set(new Date()))

  afterAll(() => MockDate.reset())

  test('Should call LoadSurveyRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    const loadAllSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.loadById('any_id')

    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return Surevey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(mockFakeSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow(new Error())
  })
})
