const favoriteModel = require('../models/favoriteModel');
const userModel = require('../models/userModel');

async function favoriteCoin(req, res) {
    const userId = req.user.userId;
    const coinId = req.params.coinId;
    const coinSymbol = req.body.symbol;
    const coinName = req.body.name;
    const coinImage = req.body.image;
    const coinCurrentPrice=req.body.current_price;
    
    try {

        favoriteModel.getFavoriteByUserIdAndCoinId(userId, coinId, (error, existingFavorite) => {
            if (error) {
                console.error('Error checking existing favorite:', error);
                res.status(500).send('Error favoriting coin');
                return;
            }

            if (existingFavorite.length > 0) {
                res.status(200).send('Coin is already favorited by the user');
                return;
            }
            else {
                 // The coin is not favorited, proceed to favorite
                favoriteModel.favoriteCoin(userId, coinId, coinName, coinSymbol, coinImage,coinCurrentPrice);
                res.status(200).send('Coin favorited successfully');
            }
        })

   

    } catch (error) {
        console.error(error);
        res.status(500).send('Error favoriting coin');
    }
}

function removeFavorite(req, res, next) {
    const userId = req.user.userId;
    const coinId = req.params.coinId;

    favoriteModel.removeFavoriteByCoinId(userId, coinId, (error, result) => {
        if (error) {
            console.error('Error removing favorite:', error);
            res.status(500).json({
                message: 'Error removing favorite from the database',
                error: error.message
            });
        } else {
            res.status(200).send('Favorite removed successfully');
        }
    });
}




async function getFavorites(req, res, next) {
    const userId = req.user.userId;
    const user =  await userModel.getUserById(userId);
    favoriteModel.getFavoritesByUserId(userId, (error, response) => {
        if (error) {
            console.error('Error retrieving favorites:', error);
            res.status(500).json({
                message: 'Error retrieving favorites from the database',
                error: error.message
            });
        } else {

            res.json({ favoriteCoins: response,user });
        }
    });
}


module.exports = {
    favoriteCoin,
    getFavorites,
    removeFavorite,
};
