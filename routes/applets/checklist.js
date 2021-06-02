const UserModel = require('../../schemas/User')
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const user = await UserModel.findById(req.userId).lean()
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.send(user.appletMeta.checklist)
})

router.post('/', (req, res) => {
    let {title, isComplete} = req.body.item
    if (!title || typeof isComplete == 'undefined'){
        return res.sendStatus(400)
    }
    const user = UserModel.findByIdAndUpdate(
        req.userId, 
        { '$push': {'appletMeta.checklist.items': req.body.item}}, 
        {new: true})
    .lean()

    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }

    return res.json(req.body.item)
})

router.put('/:itemId', (req, res) => {
    let {title, isComplete} = req.body.item
    if (!title || typeof isComplete == 'undefined'){
        return res.sendStatus(400)
    }
    const user = UserModel.findOneAndUpdate({
        _id: req.userId,
        'appletMeta.checklist.items._id': itemId
    }, req.body.item, {new: true}).lean()
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.json(item)
})
