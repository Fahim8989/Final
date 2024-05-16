const alertModel = require('../models/alertModel'); 

function addNewAlert(req, res) {
  const { coinPair, targetPrice } = req.body;
  const userId = req.user.userId;
  alertModel.addAlert(coinPair, targetPrice, userId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error saving price alert' });
    } else {
      res.json({ success: true });
    }
  });
}

module.exports = {
    addNewAlert
};

