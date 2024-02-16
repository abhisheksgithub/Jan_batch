import express from 'express'
import morgan from 'morgan'
import pokemonRouter from './routes/pokemonRouter.js'
import pokemonStaticRouter from './routes/pokemonStaticRouter.js'

const app = express()

console.log(process.env)
// Middleware : Parse request body / Logging
app.use(express.json())
// app.use(morgan('combined'))
app.use('/static', express.static('./public'))

// Middleware : Routing logic / Controller integration
app.use('/api/v1/pokemon', pokemonRouter)
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'preprod' || process.env.NODE_ENV === 'stage') {
    app.use('/pokemonStatic', pokemonStaticRouter)
}

export default app