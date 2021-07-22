const mongoose = require('mongoose')
const Layout = require('./Layout.js')
const Checklist = require('./applets/checklist/Checklist.js');

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
        checklist: {type: [Checklist], default: []}, 
        notepad: {
            title: {type: String, default: ''},
            text: {type: String, default: ''}
        }
    }

}, {strict: true})


module.exports = mongoose.models.user || mongoose.model('user', UserSchema);