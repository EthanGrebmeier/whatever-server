const mongoose = require('mongoose')

const ChecklistItemSchema = new mongoose.Schema({
    title: String,
    date: String,
    isComplete: Boolean,
    isChecked: Boolean
}, {strict: false})


module.exports = ChecklistItemSchema