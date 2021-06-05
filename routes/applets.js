const express = require('express');
const router = express.Router();


router.use('/checklist', require('./applets/checklist'))
router.use('/notepad', require('./applets/notepad'))

module.exports = router