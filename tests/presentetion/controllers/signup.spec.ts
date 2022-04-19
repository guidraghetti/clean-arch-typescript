import { SignUpController } from '../../../src/presentetion/controller/signup'
import { MissingParamError } from '../../../src/presentetion/errors/missing-param-error'

describe('Signup Controller', () => {
  test('sould return 400 if no name is provided', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'mockEmail',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('sould return 400 if no name is provided', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'moockName',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
