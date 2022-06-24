import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById } from '../../../../domain/usecases'
import { InvalidParamError } from '../../../errors'
import { forbidden, serverError } from '../../../helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      const { answer } = httpRequest.body

      if (survey) {
        const answers = survey.answers.map(answer => answer.answer)

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
