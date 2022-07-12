import { LogErrorRepository } from '@/data/protocols'

export const mockLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      'any_stack'
    }
  }

  return new LogErrorRepositoryStub()
}
