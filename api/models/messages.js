'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    text: { type: String }
},
{
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);