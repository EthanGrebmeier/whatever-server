const express = require('express');
const router = express.Router();
const UserModel = require('../../schemas/User')

router.get('/', async (req, res) => {
    const user = await UserModel.findByID(req.userID).lean()
    console.log(user)
    return res.json(user)
})

router.use('/layout', require('./layout'))
router.use('/settings', require('./settings'))

module.exports = router