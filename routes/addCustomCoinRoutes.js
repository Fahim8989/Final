// routes/addCustomCoinRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const customCoinController = require('../controllers/customCoinController');
const path =require('path')
const viewsPath = path.join(__dirname, '../views');

router.use(authenticateToken);

// Render the "Add Custom Coin" page
router.get('/',authenticateToken, function (req, res) {
    res.sendFile('addCustomCoin.html', {  root: viewsPath});
});

// Handle the form submission
router.post('/api',authenticateToken,  customCoinController.addCustomCoin);

module.exports = router;
