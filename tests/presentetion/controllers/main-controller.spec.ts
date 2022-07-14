import { MainController } from '@/presentation/controller'
import { RUNNING_MESSAGE } from '@/main/config/constants'
import { success } from '@/presentation/helpers/http/http-helper'

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

    expect(successMessage).toEqual(success(RUNNING_MESSAGE))
  })
})
