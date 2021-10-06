import mongoose from 'mongoose'
import app from './app'

const port = process.env.PORT || 3001
const database = process.env.DATABASE

mongoose.connect(database, (err) => {
  if (!err) console.log('connected to database!')
})

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is listening on port: ${port}`)
  }
})
