const UserModel = require('../../schemas/User')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const user = await UserModel.findById(req.userID).lean()
    console.log(user)
    if (!user?.appletMeta?.notepad) {
        return res.sendStatus(404)
    }
    return res.send({notepad: user.appletMeta.notepad})
})

router.post('/', async (req, res) => {

    let parsedNotepad = {
        title: req.body.notepad.title,
        text: req.body.notepad.text 
    }

    console.log(parsedNotepad)

    const user = await UserModel.findByIdAndUpdate(
        req.userID, 
        {
            'appletMeta.notepad' : parsedNotepad
        }, 
        {new: true})
    .lean()
    console.log('Notepad Update')
    console.log('')
    console.log(user)

    if (!user?.appletMeta?.notepad) {
        return res.sendStatus(404)
    }

    return res.json({notepad: parsedNotepad})
})



module.exports = router