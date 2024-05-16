const db = require('../configs/db');

async function favoriteCoin(userId, coinId, coinName, coinSymbol, coinImage, coinCurrentPrice) {
    const query = 'INSERT INTO user_favorites (user_id, coin_id, coin_name, coin_symbol, coin_image, coin_current_price) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(query, [userId, coinId, coinName, coinSymbol, coinImage, coinCurrentPrice]);
}


function removeFavoriteByCoinId(userId, coinId, callback) {
    const query = 'DELETE FROM user_favorites WHERE user_id = ? AND coin_id = ?';
    const values = [userId, coinId];

    db.query(query, values, callback);
}


function getFavoriteByUserIdAndCoinId(userId, coinId, callback) {
    const query = 'SELECT * FROM user_favorites WHERE user_id = ? AND coin_id = ?';
    db.query(query, [userId, coinId], callback);

}


function getFavoritesByUserId(userId, callback) {
    const query = 'SELECT * FROM user_favorites WHERE user_id = ?';
    db.query(query, [userId], callback);
}

function searchCoins(userId, searchTerm, callback) {
    const query = `
        SELECT *
        FROM user_favorites
        WHERE user_id = ? AND (coin_id LIKE ? OR coin_name LIKE ? OR coin_symbol LIKE ?)
    `;
    const values = [userId, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

    db.query(query, values, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
}
module.exports = {
    favoriteCoin,
    getFavoriteByUserIdAndCoinId,
    getFavoritesByUserId,
    removeFavoriteByCoinId,
    searchCoins,
};
