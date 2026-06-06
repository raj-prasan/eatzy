import { NextFunction, RequestHandler , Request, Response} from "express"

const asyncHandler = (requestHandler: RequestHandler) =>{
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err))
  }
}

export default asyncHandler


/* const asyncHandler = (fn) => async(req, res, next) => {
  try {
    await fn(req, res,next)
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message : error.message
    })
  }
} */