import express, { application } from 'express'
import dotenv from 'dotenv'
import productRouter from './router/product'
import clothingRouter from './router/fashion'
import globalErrorHandler from './utils/GlobalError'

const app = express()

dotenv.config()
app.use(express.json())

app.use('/api/v1/product', productRouter)
app.use('/api/v1/clothing', clothingRouter)

app.use(globalErrorHandler)

export default app
