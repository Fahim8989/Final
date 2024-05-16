const db = require('../configs/db');

function addAlert(coinPair, targetPrice, userId, callback) {
  const insertQuery = `
    INSERT INTO price_alerts (coin_pair, target_price, user_id)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [coinPair, targetPrice, userId], (err, result) => {
    if (err) {
      console.error('Error saving price alert:', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  addAlert,
};
