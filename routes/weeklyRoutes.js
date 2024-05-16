const express = require('express');
const router = express.Router();
const weeklyPricesController = require('../controllers/weeklyPricesController');
const authenticateToken = require('../middlewares/authMiddleware');
const path =require('path')
const viewsPath = path.join(__dirname, '../views');


router.get('/',authenticateToken, function (req, res) {
    res.sendFile('weeklyprices.html', {  root: viewsPath});
});
// Route to handle the form submission
router.post('/',authenticateToken, weeklyPricesController.getWeeklyPrices);

module.exports = router;
