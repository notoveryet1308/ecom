import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import globalErrorHandler from './utils/GlobalError'
import AppError from './utils/AppError'

import productRouter from './router/product'
import clothingRouter from './router/fashion'
import electronicsRouter from './router/electronics'
import userRouter from './router/user'
import autoSuggestionRouter from './router/autoSuggestion'
import orderedProductRouter from './router/orderProduct'
import paymentRouter from './router/payment'

const app = express()

app.use(cors())
dotenv.config()
app.use(express.json())

app.use('/api/v1/product', productRouter)
app.use('/api/v1/clothing', clothingRouter)
app.use('/api/v1/electronics', electronicsRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/autoSuggestion', autoSuggestionRouter)
app.use('/api/v1/order', orderedProductRouter)
app.use('/api/v1/payment', paymentRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
  })
}

app.use('*', (req, res, next) => next(new AppError('Page not found!!', 404)))

app.use(globalErrorHandler)

export default app
