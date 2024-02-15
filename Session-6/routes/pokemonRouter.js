import express from 'express'
import { createPokemon, deletePokemon, getAllPokemon, getSpecificPokemon, updatePokemon } from '../controllers/pokemonController.js'

const pokemonRouter = express.Router()

pokemonRouter
    .route('/')
    .get(getAllPokemon)
    .post(createPokemon)

pokemonRouter
    .route('/:id')
    .get(getSpecificPokemon)
    .patch(updatePokemon)
    .put(updatePokemon)
    .delete(deletePokemon)

export default pokemonRouter