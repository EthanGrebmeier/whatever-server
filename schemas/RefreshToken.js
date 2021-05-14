const mongoose = require('mongoose')

const RefreshTokenModel = new mongoose.Schema({
    refreshToken: String,
}, {timestamps: true})

module.exports = mongoose.models.refresh || mongoose.model('refresh', RefreshTokenModel);