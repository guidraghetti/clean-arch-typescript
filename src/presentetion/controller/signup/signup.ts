import { AddAccount } from '../../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { EmailValidator, Controller, HttpRequest, HttpResponse } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const { email, name, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const requiredField of requiredFields) {
        if (!httpRequest.body[requiredField]) {
          return badRequest(new MissingParamError(requiredField))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation is different from password'))
      }

      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) return badRequest(new InvalidParamError('email'))

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return success(account)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
