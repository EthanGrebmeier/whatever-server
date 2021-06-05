const mongoose = require('mongoose')

const ChecklistItemSchema = new mongoose.Schema({
    title: String,
    date: String,
    isCompleted: Boolean,
    isChecked: Boolean
}, {strict: false})


module.exports = ChecklistItemSchema