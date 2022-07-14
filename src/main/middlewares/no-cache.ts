import { NextFunction, Request, Response } from 'express'

export const noCache = (_req: Request, res: Response, next: NextFunction): void => {
  res.header('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.header('pragma', 'no-cache')
  res.header('expires', '0')
  res.header('surrogate-control', 'no-store')
  next()
}
