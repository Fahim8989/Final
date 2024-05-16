// routes/favoriteRoutes.js
const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const favoriteController = require('../controllers/favoriteController');
const router = express.Router();
const path =require('path')
const viewsPath = path.join(__dirname, '../views');

// Apply middleware to check if the user is authenticated before accessing  routes
router.use(authenticateToken);

// Route to handle favoriting a coin
router.post('/favorite/:coinId',authenticateToken, favoriteController.favoriteCoin);

// Route to handle unfollowing a coin
router.post('/unfavorite/:coinId',authenticateToken, favoriteController.removeFavorite);

router.get('/api', authenticateToken, favoriteController.getFavorites);

router.get('/',authenticateToken, function (req, res) {
    res.sendFile('favorites.html', {  root: viewsPath});
});
// Test route for fetching favorite coins


module.exports = router;
