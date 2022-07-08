import { SurveyAnswerModel } from '@/domain/models/survey'

export type AddSurveyParams = {
  question: string
  answers: SurveyAnswerModel[]
  createdAt: Date
}

export interface AddSurvey {
  add: (survey: AddSurveyParams) => Promise<void>
}
