import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadSurveyById, SaveSurveyResult } from '../../../../domain/usecases'
import { InvalidParamError } from '../../../errors'
import { forbidden, serverError, success } from '../../../helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle ({ body, params, accountId }: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = body
      const { surveyId } = params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(answer => answer.answer)

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        createdAt: new Date()
      })

      return success(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
