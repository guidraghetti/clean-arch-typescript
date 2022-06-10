import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly LoadSurveyRepository: LoadSurveyRepository) {}
  async load (): Promise<SurveyModel[]> {
    return this.LoadSurveyRepository.loadAll()
  }
}