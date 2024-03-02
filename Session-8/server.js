import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: `./${process.env.NODE_ENV}.env`})

const PORT = process.env.PORT || 8080

const DB = process.env.DATABASE.replace(/<password>/g, process.env.DB_PASSWORD)

mongoose.connect(DB).then(() => console.log('DB connection success!'))

app.listen(PORT, () => {
    console.log(`Listenning to port ${PORT}`)
})