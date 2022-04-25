import express, { Express } from 'express'
import cors from 'cors'
import { bodyParser } from '../middlewares/body-parser'

export const middlewares = (app: Express): void => {
  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser)
}
