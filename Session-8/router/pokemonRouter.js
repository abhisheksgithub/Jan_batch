import express from 'express'
import { getPokemon, insertPokemon, getSpecificPokemon, updatePokemon, removePokemon } from '../controllers/pokemonController.js'
import { authorizationRestriction, protectedController } from '../controllers/authController.js'

const router = express.Router()

router
    .route('/')
    .get(protectedController, getPokemon)
    .post(protectedController, insertPokemon)

router
    .route('/:id')
    .get(protectedController, getSpecificPokemon)
    .patch(protectedController, updatePokemon)
    .delete(protectedController, authorizationRestriction("princi", "infra"), removePokemon)

export default router