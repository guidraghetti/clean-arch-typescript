import { LoadSurveyResultController } from '@/presentation/controller'
import { HttpRequest } from '@/presentation/protocols'
import { LoadSurveyById } from '@/domain/usecases'
import { mockLoadSurveyById } from '../mocks'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyById: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyById = mockLoadSurveyById()
  return {
    sut: new LoadSurveyResultController(loadSurveyById),
    loadSurveyById
  }
}

const mackeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResultController', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyById } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyById, 'loadById')

    await sut.handle(mackeFakeRequest())

    expect(loadByIdSpy).toBeCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyById } = makeSut()
    jest.spyOn(loadSurveyById, 'loadById').mockReturnValueOnce(null)

    const httpResponse = await sut.handle(mackeFakeRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
