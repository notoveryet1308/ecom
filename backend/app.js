import express from 'express'
import dotenv from 'dotenv'
import productRouter from './router/product'
import globalErrorHandler from './utils/GlobalError'

const app = express()

dotenv.config()
app.use(express.json())

app.use('/api/v1/product', productRouter)

app.use(globalErrorHandler)

export default app
