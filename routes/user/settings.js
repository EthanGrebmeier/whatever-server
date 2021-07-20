const express = require('express');
const router = express.Router();
const UserModel = require('../../schemas/User')

router.get('/background', async (req, res) => {
    const user = await UserModel.findByID(req.userID).lean()
    return res.json(user.settings.background)
})

router.post('/background', async (req, res) => {
    let user = await UserModel.findByIDAndUpdate(
        req.userID, 
        {"settings.background" : req.body.background},
        {new: true}
    )

    if (!user){
        res.send(400)
    }
    
    res.json(user.settings)
}) 



module.exports = router