const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: Number,
    name: String,
    url: String,
    iconUrl: String,
    slug: String
})

module.exports = mongoose.model('lists', userSchema);