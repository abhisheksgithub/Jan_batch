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
    stats: {
        type: Number
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

pokemonSchema.virtual("Legendary").get(function() {
    // business logic
    return this.rarity === 'rare' && this.rating > 4 ? "Yes" : "No"
})

pokemonSchema.pre("save", function(next) {
    this.stats = this.rating * 10 // costly
    next()
})

pokemonSchema.post("save", function(doc, next) {
    console.log(doc)
    next()
})

pokemonSchema.pre(/^find/, function(next) {
    this.find({ rating: { $gt: 4 } })
    next()
})

const Pokemon = mongoose.model("PokemonMaster", pokemonSchema)

export default Pokemon


// AuthN vs Author
