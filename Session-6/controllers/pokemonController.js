import { currentDateTimeInString } from "../utils/common.js"
import fs from 'fs'

const getAllPokemon = (req, res) => {
    fs.readFile('./stubData/pokemon.json', (err, data) => {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.writeHead(200, {
            "Content-Type": "application/json"
        }).end(data)
    })
}

const getSpecificPokemon = (req, res) => {
    res.status(500)
    res.send({
        status: 'error',
        message: 'failed'
    })
}

const createPokemon = (req, res) => {
    res.status(500)
    res.send({
        status: 'error',
        message: 'failed'
    })
}

const updatePokemon = (req, res) => {
    res.status(500)
    res.send({
        status: 'error',
        message: 'failed'
    })
}

const deletePokemon = (req, res) => {
    res.status(500)
    res.send({
        status: 'error',
        message: 'failed'
    })
}

export { getAllPokemon, getSpecificPokemon, createPokemon, updatePokemon, deletePokemon}