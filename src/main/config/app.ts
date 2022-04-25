import express from 'express'
import { middlewares } from './middleware'

const app = express()
middlewares(app)

export default app
