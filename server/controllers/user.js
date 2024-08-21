const User = require('../models/user.js');
const bcrypt = require('bcryptjs')
const handleGetUser = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const handleAddNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const bcyptedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name: name,
        email: email,
        password: bcyptedPassword
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports  = {handleGetUser, handleAddNewUser};