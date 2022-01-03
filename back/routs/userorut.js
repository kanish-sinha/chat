const express = require('express');
const User = require('../models/user');
const router = express.Router();
router.get('/', async(req, res) => {
    let user = await User.find()
    res.json(user);
})
router.get('/:id', async(req, res) => {
    let user = await User.find({ _id: req.params.id })
    res.json(user);
})
router.post('/login', async(req, res) => {
    let user = req.body;
    let users = await User.findOne({ email: user.email })
    if (!users)
        return res.json(users)
    if (users.password == user.password) {
        let token = jwt.sign({ _id: users._id }, users.password)
        res.send({ token });
    }
})
router.post('/signup', async(req, res) => {
    let users = req.body;
    users = new User(req.body);
    await users.save();
})
module.exports = router;