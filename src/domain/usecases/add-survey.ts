type SurveyAnsware = {
  image?: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: SurveyAnsware[]
  createdAt: Date
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
