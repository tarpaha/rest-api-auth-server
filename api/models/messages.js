'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    text: { type: String }
},
{
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);