const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const path =require('path')
const viewsPath = path.join(__dirname, '../views');

router.get('/signup', (req, res) => {
    res.sendFile('signup.html', { root: viewsPath});
});

router.post('/signup', authController.signup);

router.get('/login', (req, res) => {
    res.sendFile('login.html',{ root: viewsPath});
});

router.post('/login', authController.login);

module.exports = router;
