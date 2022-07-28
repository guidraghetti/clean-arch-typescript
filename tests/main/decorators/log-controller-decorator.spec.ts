import { LogErrorRepository } from '@/data/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { HttpResponse, HttpRequest, Controller } from '@/presentation/protocols'
import { serverError, success } from '@/presentation/helpers/http/http-helper'
import { mockFakeAccountModel } from '../../domain/mocks'
import { mockLogErrorRepositoryStub } from '../../data/mocks'

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return success(mockFakeAccountModel())
    }
  }

  return new ControllerStub()
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = mockRequest()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(success(mockFakeAccountModel()))
  })

  test('should call LogErrorRepository with correct Server Error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const error = mockServerError()
    const httpRequest = mockRequest()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
