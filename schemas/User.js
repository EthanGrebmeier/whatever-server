const mongoose = require('mongoose')
const Layout = require('./Layout.js')
const ChecklistItem = require('./applets/checklist/ChecklistItem')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    settings: {
        background: String,
    },
    layoutMeta: {
        defaultLayout: String,
        layouts: {type: [Layout], default: []}
    },
    appletMeta: {
        checklist: {
            items: {type: [ChecklistItem], default: []}
        }, 
        notepad: {
            title: {type: String, default: ''},
            text: {type: String, default: ''}
        }
    }

}, {strict: true})


module.exports = mongoose.models.user || mongoose.model('user', UserSchema);