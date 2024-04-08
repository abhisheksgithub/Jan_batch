import PokemonMaster from "../models/pokemonModel.js"
import ErrorWrapper from "../utils/ErrorWrapper.js"

const getPokemon = ErrorWrapper(async (req, res, next) => {
        const data = await PokemonMaster.find()
        res.send({
            status: 'success',
            data,
            count: data.length
        })
})

// SLA

const getSpecificPokemon = ErrorWrapper(async (req, res, next) => {
        const pokemon = await PokemonMaster.findById(req.params.id)
        res.send({
            status: 'success',
            data: pokemon
        })
})


const insertPokemon = async (req, res) => {
    try {
        const newPokemon = await PokemonMaster.create(req.body)
        res.status(201).send({
            status: 'success',
            data: newPokemon
        })
    } catch(e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

const updatePokemon = async (req, res) => {
    try {
        const updatedPokemon = await PokemonMaster.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(201).send({
            status: 'success',
            data: updatedPokemon
        })
    } catch(e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

const removePokemon = async (req, res) => {
    try {
        await PokemonMaster.findByIdAndDelete(req.params.id)
        res.status(200).send({
            status: 'success'
        })
    } catch(e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

export { getPokemon, insertPokemon, getSpecificPokemon, updatePokemon, removePokemon }


// Sign in / up/ posts // User A --> all his posts // comments 
// pass the token in the header --> UI
// header Bearer authToken  
// cookies  --> localhost ( httpOnly: true, secure: true ) --> XSS attacks
// 