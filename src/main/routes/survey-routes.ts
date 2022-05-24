import { Router } from 'express'
import { routerAdapter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', routerAdapter(makeAddSurveyControllerFactory()))
}
