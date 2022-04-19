import { SignUpController } from '../../../src/presentetion/controller/signup'

describe('Signup Controller', () => {
  test('sould return 400 if no name is provided', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'mockName',
        email: 'mockEmail',
        password: 'mockPassword',
        passwordConfirmation: 'mockPasswordConfirmation'
      }
    }
    const httpResponse = sut.handler(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
