const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const searchController = require('../controllers/searchController');
const path =require('path')
const viewsPath = path.join(__dirname, '../views');


router.get('/',authenticateToken, function (req, res) {
    res.sendFile('searchInput.html', {  root: viewsPath});
});

// Route for handling search POST requests and rendering results
router.post('/api',authenticateToken, searchController.searchCoins);

module.exports = router;
