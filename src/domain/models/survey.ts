export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  createdAt: Date
}

export interface SurveyAnswerModel {
  image?: string
  answer: string
}
