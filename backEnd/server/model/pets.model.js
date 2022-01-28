const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const PetsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "you need a name!"],
        minLength: [3, "you need at least 3 characters!!"],
    },
    type: {
        type: String,
        required: [true, "you need a type!"],
        minLength: [3, "you need at least 3 character!!"]
    },

    score: Number,
    
    skill1: String,
    skill2: String,
    skill3: String,

    description: {
        type: String,
        required: [true, "you need a description!"],
        minLength: [3, "you need at least 3 characters!!"]
    },

}, {timestamps: true})

const Pets = mongoose.model("Pets", PetsSchema)

PetsSchema.plugin(uniqueValidator);

module.exports = Pets;