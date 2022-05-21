import { Application, Response, Request, ErrorRequestHandler, NextFunction } from 'express'

const errorHandling = (app: Application): void => {
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ errorMessage: 'This route does not exist.' })
  })

  app.use((err: ErrorRequestHandler, req: Request, res: Response, _next: NextFunction) => {
    console.error('ERROR', req.method, req.path, err)

    if (!res.headersSent) {
      res
        .status(500)
        .json({
          errorMessage: 'Internal server error. Check the server console'
        })
    }
  })
}

export default errorHandling
