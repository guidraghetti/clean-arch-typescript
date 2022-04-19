import { SignUpController } from '../../../src/presentetion/controller/signup'

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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
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
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
