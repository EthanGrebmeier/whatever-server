const express = require('express');
const router = express.Router();
const UserModel = require('../../schemas/User')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.userId).lean()
    return res.json(user.layoutMeta)
})

router.post('/', async (req, res) => {
    console.log(req.body)
    delete req.body.layout._id
    if (!req.body.layout){
        res.send(400)
    }
    let user = await UserModel.findByIdAndUpdate(
        req.userId, 
        {$push: {"layoutMeta.layouts": req.body.layout}},
        {new: true}
    )
    console.log(user)
    if (req.body.isDefault){
        user.layoutMeta.defaultLayout = req.body.layout._id
        user = await UserModel.findByIdAndUpdate(
            req.userId, 
            {layoutMeta: user.layoutMeta},
            {new: true}
        )
    }
    console.log(user.layoutMeta)
    res.json(user.layoutMeta)
}) 

router.get('/:layoutId', async (req, res) => {
    const user = await UserModel.findOne({
        _id: req.userId
    })
    let layout = user.layoutMeta.layouts.id(req.params.layoutId)
    if (!layout){
        return res.sendStatus(404)
    }
    return res.json(layout)
})

router.delete('/:layoutId', async (req, res) => {
    let user = await UserModel.findByIdAndUpdate(
        req.userId, 
        {$pull: {"layoutMeta.layouts": {_id: req.params.layoutId}}},
        {new: true}
    )

    if (!user){
        return res.sendStatus(404)
    }

    return res.json(user.layoutMeta)
})


module.exports = router