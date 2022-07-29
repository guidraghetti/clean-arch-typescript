import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { RUNNING_MESSAGE } from '@/main/config/constants'

export class MainController implements Controller {
  async handle (): Promise<HttpResponse> {
    return ok(RUNNING_MESSAGE)
  }
}
