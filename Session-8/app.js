import express from 'express'
import pokemonRouter from './router/pokemonRouter.js'
import productRouter from './router/productRouter.js'

const app = express()
app.use(express.json())

app.use('/api/v1/pokemon', pokemonRouter)
app.use('/api/v1/product', productRouter)

export default app