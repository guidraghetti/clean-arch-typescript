import { MainController } from '@/presentation/controllers'
import { RUNNING_MESSAGE } from '@/main/config/constants'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  sut: MainController
}

const makeSut = (): SutTypes => {
  const sut = new MainController()

  return {
    sut
  }
}

describe('Main controller', () => {
  test('should return Server is running message', async () => {
    const { sut } = makeSut()

    const successMessage = await sut.handle()

    expect(successMessage).toEqual(ok(RUNNING_MESSAGE))
  })
})
