import { SurveyModel } from '../models/survey'
import { SurveyResultModel } from '../models/survey-result'
import { AddSurveyParams } from '@/domain/usecases'

export const mockFakeSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  }
}

export const mockFakeSurveyModels = (): SurveyModel[] => ([{
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  createdAt: new Date()
},
{
  id: 'other_id',
  question: 'other_question',
  answers: [{
    image: 'other_image',
    answer: 'other_answer'
  }],
  createdAt: new Date()
}])

export const mockSaveSurveyResultParams = (): Omit<SurveyResultModel, 'id'> => ({
  surveyId: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  createdAt: new Date()
})

export const mockSaveSurveyResultModel = (): SurveyResultModel => Object.assign({}, mockSaveSurveyResultParams(), {
  id: 'any_id'
})

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  createdAt: new Date()
})
