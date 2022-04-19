import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './protocols/http'

export class SignUpController {
  handler (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: email')
      }
    }
  }
}
