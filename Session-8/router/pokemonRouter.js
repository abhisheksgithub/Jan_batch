import express from 'express'
import { getPokemon, insertPokemon, getSpecificPokemon, updatePokemon, removePokemon } from '../controllers/pokemonController.js'

const router = express.Router()

router
    .route('/')
    .get(getPokemon)
    .post(insertPokemon)

router
    .route('/:id')
    .get(getSpecificPokemon)
    .patch(updatePokemon)
    .delete(removePokemon)

export default router