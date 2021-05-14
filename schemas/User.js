const mongoose = require('mongoose')
const Layout = require('./Layout.js')

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
    }

}, {strict: false})


module.exports = mongoose.models.user || mongoose.model('user', UserSchema);