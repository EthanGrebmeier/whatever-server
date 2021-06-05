const UserModel = require('../../schemas/User')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.userId).lean()
    console.log(user)
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.send(user.appletMeta.checklist)
})

router.post('/', async (req, res) => {
    let item = req.body.item
    if (!item || !item.title || typeof item.isCompleted == 'undefined'){
        return res.sendStatus(400)
    }
    const user = await UserModel.findByIdAndUpdate(
        req.userId, 
        { '$push': {'appletMeta.checklist.items': req.body.item}}, 
        {new: true})
    .lean()

    console.log(user)

    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }

    let items = user.appletMeta.checklist.items
    console.log(items[items.length - 1])
    console.log(items)

    return res.json(items[items.length - 1])
})

router.put('/:itemId', async (req, res) => {
    let item = req.body.item
    console.log(item)
    if (!item.title || typeof item.isCompleted == 'undefined'){
        return res.sendStatus(400)
    }
    const user = await UserModel.findOneAndUpdate({
        _id: req.userId,
        'appletMeta.checklist.items._id': req.params.itemId
    }, 
    {
        '$set' : {
            'appletMeta.checklist.items.$' : item
        }
    }, {new: true}).lean()
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.json(item)
})

router.delete('/', async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.userId,
    {
        $pull: {'appletMeta.checklist.items': {isCompleted: true}}
    }).lean()
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.send(user.appletMeta.checklist)
})

router.delete('/:itemId', async (req, res) => {
    console.log(req.params.itemId)
    const user = await UserModel.findOneAndUpdate({
        _id: req.userId
    },
    {
        $pull: {'appletMeta.checklist.items': {_id: req.params.itemId}}
    }).lean()
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.send(user.appletMeta.checklist)
})


module.exports = router