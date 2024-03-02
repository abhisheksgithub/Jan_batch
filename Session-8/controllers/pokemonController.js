import PokemonMaster from "../models/pokemonModel.js"

const getPokemon = async (req, res) => {
    try {
        const data = await PokemonMaster.find()

        res.send({
            status: 'success',
            data,
            count: data.length
        })

    } catch (e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}

const getSpecificPokemon = async (req, res) => {
    try {
        const pokemon = await PokemonMaster.findById(req.params.id)
        res.send({
            status: 'success',
            data: pokemon
        })
    } catch(e) {
        res.status(500).send({
            status: 'failure',
            err: e.message
        })
    }
}


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





// PokemonMaster.find()
// .cursor()
// .on('data', (data) => {
//     // res.set('Content-Type', 'application/json')
//     res.write(data.toString()) // sending the payload
// })
// .on('end', () => {
//     res.send()
// })