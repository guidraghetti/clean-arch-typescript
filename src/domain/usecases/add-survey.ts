import { SurveyAnswerModel } from '../models/survey'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  createdAt: Date
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
