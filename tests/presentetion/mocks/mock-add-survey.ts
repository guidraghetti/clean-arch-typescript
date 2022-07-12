import { AddSurvey, AddSurveyParams } from '@/domain/usecases'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyParams): Promise<void> {
      ''
    }
  }
  return new AddSurveyStub()
}
