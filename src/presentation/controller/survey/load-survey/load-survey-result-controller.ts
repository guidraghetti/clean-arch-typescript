import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly loadSurveyResult: LoadSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      return success(await this.loadSurveyResult.load(surveyId))
    } catch (error) {
      return serverError(error)
    }
  }
}
