const favoriteModel = require('../models/favoriteModel');
const userModel = require('../models/userModel');

async function addCustomCoin(req, res) {
    const userId = req.user.userId;
    const coinId = req.body.coinId;
    const coinSymbol = req.body.coinSymbol;
    const coinName = req.body.coinName;
    const coinImage = req.body.coinImage;
    const coinCurrentPrice = req.body.coinCurrentPrice;
    try {

        favoriteModel.getFavoriteByUserIdAndCoinId(userId, coinId, (error, existingFavorite) => {
            if (error) {
                res.status(500).send('Error checking custom coin');
                return;
            }

            if (existingFavorite.length > 0) {
                res.status(200).send('Custom Coin is already favorited by the user');
                return;
            }
            else {
                 // The coin is not favorited, proceed to favorite
                favoriteModel.favoriteCoin(userId, coinId, coinName, coinSymbol, coinImage, coinCurrentPrice);
                res.status(200).send('Custom Coin favorited successfully');
            }
        })

   

    } catch (error) {
        console.error(error);
        res.status(500).send('Error favoriting coin');
    }
}

module.exports = {
    addCustomCoin,
};
