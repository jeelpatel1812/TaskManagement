const User = require('../models/user.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'qwertyuioplkjhgaSsas#^%$XFCaa';
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

const handleUserLogin = async(req, res) =>{
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
    return res.status(400).json({ message: "User not found"  });
    }
  
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(400).json({ message: "Invalid Credentials"});
    }
    const token = jwt.sign({email}, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "Login Successfully.", token, email});
}

module.exports  = {handleGetUser, handleAddNewUser, handleUserLogin};