const express = require('express');
const Msg = require('../models/messages');
const router = express.Router();
router.get('/:id', async(req, res) => {
    let message = await Msg.find({ _id: req.params.id })
    res.json(message)
})
module.exports = router;