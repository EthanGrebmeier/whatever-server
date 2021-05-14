const mongoose = require('mongoose')
const Applet = require('./Applet.js')

const LayoutSchema = new mongoose.Schema({
    name: String,
    applets: [Applet]

}, {strict: false})


module.exports = LayoutSchema