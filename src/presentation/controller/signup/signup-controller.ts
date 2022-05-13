import { AddAccount, Authentication } from '../../../domain/usecases'
import { UniqueError } from '../../errors/unique-error'
import { badRequest, forbidden, success, serverError } from '../../helpers/http/http-helper'
import { Controller, Validation, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)

      if (validationError) {
        return badRequest(validationError)
      }

      const { email, name, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new UniqueError(email))
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
