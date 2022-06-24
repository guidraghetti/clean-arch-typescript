import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { LoadSurveyRepository } from '@/data/protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly LoadSurveyRepository: LoadSurveyRepository) {}
  async load (): Promise<SurveyModel[]> {
    return this.LoadSurveyRepository.loadAll()
  }
}
