import mongoose from "mongoose"

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Pokemon should have a name'],
        unique: true
    },
    power: {
        type: String,
        required: true
    },
    rating: Number,
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true
    },
    rarity: String,
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    }
})

const Pokemon = mongoose.model("PokemonMaster", pokemonSchema)

export default Pokemon
