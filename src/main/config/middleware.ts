import express, { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export const middlewares = (app: Express): void => {
  app.use(express.json())
  app.use(cors)
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser)
}
