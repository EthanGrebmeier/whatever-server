const mongoose = require('mongoose')
const ChecklistItem = require('./ChecklistItem')

const ChecklistSchema = new mongoose.Schema({
    name: String,
    items: {type: [ChecklistItem], default: []},
    isCompleted: Boolean,
    isChecked: Boolean
}, {strict: false})


module.exports = ChecklistSchema
