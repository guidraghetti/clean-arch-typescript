import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/data/protocols'

export class DbLoadSurveyById implements LoadSurveyByIdRepository {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
