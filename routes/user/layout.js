const express = require('express');
const router = express.Router();
const UserModel = require('../../schemas/User')

router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.userID).lean()
    return res.json(user.layoutMeta)
})

router.post('/', async (req, res) => {
    if (!req.body.layout){
        res.send(400)
    }
    
    delete req.body.layout._id
    
    let user = await UserModel.findByIdAndUpdate(
        req.userID, 
        {$push: {"layoutMeta.layouts": req.body.layout}},
        {new: true}
    )
    res.json(user.layoutMeta)
}) 

router.get('/:layoutID', async (req, res) => {
    const user = await UserModel.findOne({
        _id: req.userID
    })
    let layout = user?.layoutMeta?.layouts?.id(req.params.layoutID)
    if (!layout){
        return res.sendStatus(404)
    }
    return res.json(layout)
})


router.put('/:layoutID', async (req, res) => {
    console.log(req.body)
    if(!req.body?.layout){
        return res.sendStatus(400)
    }

    const user = await UserModel.findOneAndUpdate({
        _id: req.userID,
        "layoutMeta.layouts._id" : req.body.layout._id
    },
    {
        "$set" : {
            "layoutMeta.layouts.$" : req.body.layout
        }
    },
    {new: true})

    if (!user){
        return res.sendStatus(404)
    }

    if (req.body.isDefault){
        user.layoutMeta.defaultLayout = req.body.layout._id
        await user.save()
    }

    return res.json(user.layoutMeta)
})

router.delete('/:layoutID', async (req, res) => {
    let user = await UserModel.findByIdAndUpdate(
        req.userID, 
        {$pull: {"layoutMeta.layouts": {_id: req.params.layoutID}}},
        {new: true}
    )

    if (!user){
        return res.sendStatus(404)
    }

    if (user.layoutMeta.defaultLayout == req.params.layoutID){
        user.layoutMeta.defaultLayout == ''
        await user.save()
    }

    return res.json(user.layoutMeta)
})


module.exports = router