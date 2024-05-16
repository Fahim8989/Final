const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const path =require('path')
const viewsPath = path.join(__dirname, '../views');



router.get('/',authenticateToken, function (req, res) {
    res.sendFile('chart.html', {  root: viewsPath});
});

router.get('/compare',authenticateToken, function (req, res) {
    res.sendFile('comparecharts.html', {  root: viewsPath});
});




module.exports = router;
