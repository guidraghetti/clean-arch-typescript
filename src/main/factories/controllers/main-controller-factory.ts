import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { MainController } from '@/presentation/controllers'

export const makeMainControllerFactory = (): Controller => {
  const controller = new MainController()

  return makeLogControllerDecorator(controller)
}
