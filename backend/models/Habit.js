const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

    // NUEVOS CAMPOS PARA SEMANA 3

    days:{
        type: Number,
        default: 0
    },

    startedAt:{
        type: Date,
        default: Date.now
    },

    lastDone:{
        type: Date,
        default: null
    },

    lastUpdate:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Habit', habitSchema);