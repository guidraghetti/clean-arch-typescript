import { LoadSurveys } from '@/domain/usecases'
import { serverError, success, successNoContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      return surveys.length ? success(surveys) : successNoContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
