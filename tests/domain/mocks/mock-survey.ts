import { SurveyModel } from '../models/survey'
import { SurveyResultModel } from '../models/survey-result'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases'

export const mockFakeSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer'
    }, {
      answer: 'other_answer',
      image: 'any_image'
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

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  createdAt: new Date()
})

export const mockSaveSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0
  }, {
    answer: 'other_answer',
    image: 'any_image',
    count: 0,
    percent: 0
  }],
  createdAt: new Date()
})

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  createdAt: new Date()
})
