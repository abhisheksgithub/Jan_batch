import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const pokemonStaticRouter = express.Router()

pokemonStaticRouter
    .route('/')
    .get((req, res) => {
        const filePath = fileURLToPath(import.meta.url)
        console.log("import.meta.url", import.meta.url)
        console.log("path" ,filePath)
        console.log(path.join(filePath, '../../public'))

        fs.readFile(`${path.join(filePath, '../../public')}/pokemon.html`, (err, data) => {
            // console.log("reached here", data, err)
            if (err) {
                res.statusCode = 500
                return res.send(err)
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(data)
        })
    })

export default pokemonStaticRouter