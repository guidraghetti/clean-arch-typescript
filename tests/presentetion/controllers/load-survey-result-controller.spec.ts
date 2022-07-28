import MockDate from 'mockdate'
import { LoadSurveyResultController } from '@/presentation/controller'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadSurveyById, mockLoadSurveyResult } from '../mocks'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { mockSaveSurveyResultModel, throwError } from '../../domain/mocks'
import { LoadSurveyResult, LoadSurveyById } from '@/domain/usecases'

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyById: LoadSurveyById
  loadSurveyResult: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyById = mockLoadSurveyById()
  const loadSurveyResult = mockLoadSurveyResult()

  return {
    sut: new LoadSurveyResultController(loadSurveyById, loadSurveyResult),
    loadSurveyById,
    loadSurveyResult
  }
}

const mackeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

describe('LoadSurveyResultController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

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

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyById } = makeSut()
    jest.spyOn(loadSurveyById, 'loadById').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mackeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResult } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResult, 'load')

    await sut.handle(mackeFakeRequest())

    expect(loadSpy).toBeCalledWith('any_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mackeFakeRequest())

    expect(httpResponse).toEqual(success(mockSaveSurveyResultModel()))
  })
})
