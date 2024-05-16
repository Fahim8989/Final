// routes/addCustomCoinRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const addAlertController = require('../controllers/addAlertController');
const path = require('path')
const viewsPath = path.join(__dirname, '../views');
const db = require('../configs/db')
const transporter = require('../configs/nodemailerConfig')

router.use(authenticateToken);

// Render the "Add Custom Coin" page
router.get('/', authenticateToken, function (req, res) {
  res.sendFile('addalert.html', { root: viewsPath });
});

router.post('/', authenticateToken, addAlertController.addNewAlert);

router.get('/alerts', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  const fetchQuery = `
      SELECT * FROM price_alerts WHERE user_id = ?
    `;

  db.query(fetchQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching price alerts:', err);
      res.status(500).json({ error: 'Error fetching price alerts' });
    } else {
      res.json(results);
    }
  });
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {

  try {
    const alertId = req.params.id;
    const userId = req.user.userId;
    // Delete the alert from the database only if the userID matches
    const deleteQuery = 'DELETE FROM price_alerts WHERE id = ? AND user_id = ?';

    await db.query(deleteQuery, [alertId, userId]);


    console.log(`Alert with id ${alertId} deleted successfully`);
    res.json({ success: true, message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({ success: false, error: 'Error deleting alert' });
  }
});

// Add this endpoint to your existing code
router.post('/sendEmail/:id', authenticateToken, async (req, res) => {
  try {
    const alertId = req.params.id;
    const { coinPair, targetPrice } = req.body;
    const userId = req.user.userId;
    // Fetch the alert details from the database
    // const selectQuery = 'SELECT * FROM price_alerts WHERE id = ? AND user_id = ?';
    // await db.query(selectQuery, [alertId, userId]);


    // Send email
    const mailOptions = {
      from: '"Trading Pricer 👻" tradingpricer@gmail.com', // sender address
      to: "fahimahmed0503@gmail.com", // list of receiver(s) separated by comma "abc@gmail.com,def@gmail.com"
      subject: `Alert: ${coinPair} `, // Subject line
      text: `Alert: ${coinPair} crossed the target price of ${targetPrice}`,
      html: `<b>Alert: ${coinPair} crossed the target price of ${targetPrice}</b>`, // html body if you want to add HTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: 'Error sending email' });
      }

      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    });
  } catch (error) {
    console.error('Error handling email alert:', error);
    res.status(500).json({ success: false, error: 'Error handling email alert' });
  }
});

module.exports = router;
