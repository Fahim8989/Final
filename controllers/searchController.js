const userModel = require('../models/userModel');
const favoriteModel = require('../models/favoriteModel');


async function searchCoins(req, res, next) {
    const userId = req.user.userId; 
    const searchTerm = req.body.searchTerm || ''; 
    const user = await userModel.getUserById(userId);
    favoriteModel.searchCoins(userId, searchTerm, (error, searchResults) => {
        if (error) {
            console.error('Error searching coins:', error);
            return res.status(500).json({
                message: 'Error searching coins in the database',
                error: error.message
            });
        }
        
        res.json({ searchTerm: searchTerm, searchResults: searchResults, user });

    });
}

module.exports = {
    searchCoins: searchCoins
};
