const UserModel = require('../../schemas/User')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.userID).lean()
    console.log(user)
    if (!user?.appletMeta?.checklist) {
        return res.sendStatus(404)
    }
    return res.send({checklists: user.appletMeta.checklist})
})

router.post('/', async (req, res) => {
    const newListID = mongoose.Types.ObjectId()
    const user = await UserModel.findById(req.userID)

    if (!user){
        return res.sendStatus(404)
    }

    user.appletMeta.checklist.push({
        _id: newListID,
        name: req.body.name,
        items: []
    })

    user.save()
    
    return res.json({checklist: {
        _id: newListID,
        name: req.body.name,
        items: []
    }})
})

router.delete('/:checklistID/', async (req, res) => {
    const checklistID = req.params.checklistID
    const user = await UserModel.findById(req.userID)

    if (!user){
        res.sendStatus(404)
    }

    user.appletMeta.checklist = user.appletMeta.checklist.filter(checklist => checklist._id != checklistID)

    await user.save()

    res.send()
})

router.post('/:checklistID/item', async (req, res) => {
    let item = req.body.item
    if (!item || !item.title || typeof item.isCompleted == 'undefined'){
        return res.sendStatus(400)
    }
    const newItemID = mongoose.Types.ObjectId()
    item = {
        ...req.body.item,
        _id: newItemID
    }
    let checklistID = req.params.checklistID

    const user = await UserModel.findById(req.userID)

    let checklists = user.appletMeta.checklist

    let checklistIndex = checklists.map((checklist) => (checklist._id)).indexOf(checklistID)

    if (typeof checklistIndex === 'undefined') {
        return res.sendStatus(404)
    }

    user.appletMeta.checklist[checklistIndex].items.push(item)

    await user.save()

    return res.json({item})
})

// Update an existing item

router.put('/:checklistID/item/:itemID', async (req, res) => {
    let item = req.body.item
    if (!item.title || typeof item.isCompleted == 'undefined'){
        return res.sendStatus(400)
    }
    let validatedItem = {
        title: item.title,
        date: item.date,
        isCompleted: item.isCompleted,
        isChecked: item.isChecked,
    }

    console.log(validatedItem)

    let checklistID = req.params.checklistID
    let itemID = req.params.itemID
    
    const user = await UserModel.findById(req.userID)

    let checklists = user.appletMeta.checklist

    let checklistIndex = checklists.map((checklist) => (checklist._id)).indexOf(checklistID)

    if (typeof checklistIndex === 'undefined') {
        return res.sendStatus(404)
    }

    let itemIndex = checklists[checklistIndex].items.map(item => (item._id)).indexOf(itemID)

    if (typeof itemIndex === 'undefined') {
        return res.sendStatus(404)
    }

    user.appletMeta.checklist[checklistIndex].items[itemIndex] = validatedItem

    await user.save()

    return res.json(validatedItem)
})

router.delete('/:checklistID/item/', async (req, res) => {
    let checklistID = req.params.checklistID
    const user = await UserModel.findById(req.userID)

    let checklists = user.appletMeta.checklist

    let checklistIndex = checklists.map((checklist) => (checklist._id)).indexOf(checklistID)

    if (typeof checklistIndex === 'undefined') {
        return res.sendStatus(404)
    }

    user.appletMeta.checklist[checklistIndex].items = user.appletMeta.checklist[checklistIndex].items.filter(item => !item.isCompleted)

    await user.save()

    return res.send()
})

router.delete('/:checklistID/item/:itemID', async (req, res) => {
    console.log(req.params.itemID)
    let checklistID = req.params.checklistID
    let itemID = req.params.itemID

    const user = await UserModel.findById(req.userID)

    let checklists = user.appletMeta.checklist

    let checklistIndex = checklists.map((checklist) => (checklist._id)).indexOf(checklistID)

    if (typeof checklistIndex === 'undefined') {
        return res.sendStatus(404)
    }

    user.appletMeta.checklist[checklistIndex].items = user.appletMeta.checklist[checklistIndex].items.filter(item => item._id != itemID)

    await user.save()

    return res.send()
})


module.exports = router