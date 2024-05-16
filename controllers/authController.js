const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET=process.env.JWT_SECRET_KEY;

async function signup(req, res) {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            // If the email already exists, return an error
            return res.status(400).send('Email already exists');
        }

        // Check if the password meets the length requirement
        if (password.length < 5) {
            return res.status(400).send('Password must be at least 5 characters long');
        }

        // If the email doesn't exist and the password meets the length requirement, proceed with user creation
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.createUser(username, email, hashedPassword);
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
}



async function login(req, res) {
    const { username, password } = req.body;

    try {
        const results = await userModel.getUserByUsername(username);

        if (results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
             const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' }); // Token expires in 15 minutes
    req.session.userId = user.id;
    res.cookie('token', token, { httpOnly: true, maxAge: 900000 }); // 15 minutes expiration (15 * 60 * 1000)
            res.redirect('/user/dashboard');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during login');
    }
}

module.exports = {
    signup,
    login,
};
