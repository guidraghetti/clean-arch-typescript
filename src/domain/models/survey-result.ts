import { SurveyAnswerModel } from './survey'

type SurveyResultAnswerModel = SurveyAnswerModel & {
  count: number
  percent: number
}

export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyResultAnswerModel[]
  createdAt: Date
}
