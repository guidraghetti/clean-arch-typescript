import { success } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { RUNNING_MESSAGE } from '@/main/config/constants'

export class MainController implements Controller {
  async handle (): Promise<HttpResponse> {
    return success(RUNNING_MESSAGE)
  }
}
