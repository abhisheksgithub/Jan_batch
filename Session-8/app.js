import express from 'express'
import pokemonRouter from './router/pokemonRouter.js'
import productRouter from './router/productRouter.js'
import userRouter from './router/userRouter.js'
import errorController from './controllers/errorController.js'

const app = express()
app.use(express.json())
app.use((req, res, next)=> {
    // 
    next()
})
app.use('/api/v1/pokemon', pokemonRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/users', userRouter)

app.use('*', (req, res, next) => {
    next({
        status: "Not Found",
        message: "Path non existent!"
    })
})

app.use(errorController)

export default app