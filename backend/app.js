import express from 'express'
import dotenv from 'dotenv'
import globalErrorHandler from './utils/GlobalError'
import AppError from './utils/AppError'

import productRouter from './router/product'
import clothingRouter from './router/fashion'
import electronicsRouter from './router/electronics'
import userRouter from './router/user'

const app = express()

dotenv.config()
app.use(express.json())

app.use('/api/v1/product', productRouter)
app.use('/api/v1/clothing', clothingRouter)
app.use('/api/v1/electronics', electronicsRouter)
app.use('/api/v1/user', userRouter)


app.use('*', (req, res, next) => next(new AppError('Page not found!!', 404)))

app.use(globalErrorHandler)

export default app
