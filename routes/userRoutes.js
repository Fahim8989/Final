
const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const { getCryptoRates } = require('../controllers/userController');
const router = express.Router();
const path =require('path')
const viewsPath = path.join(__dirname, '../views');

router.get('/dashboard/userinfo', authenticateToken, userController.getUserDetails);

router.get('/dashboard', authenticateToken, function (req, res) {
    res.sendFile('dashboard.html',  {  root: viewsPath});
});

router.get('/api/cryptorates', authenticateToken, getCryptoRates);

router.get('/cryptorates',authenticateToken, function (req, res) {
    res.sendFile('cryptorate.html', {  root: viewsPath});
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('token');
    res.redirect('/');
});



module.exports = router;
