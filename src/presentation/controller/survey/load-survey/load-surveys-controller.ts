import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { serverError, success, successNoContent } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

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
