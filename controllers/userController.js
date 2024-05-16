const userModel = require('../models/userModel');
const axios=require('axios')
const path =require('path')
const viewsPath = path.join(__dirname, '../views');

async function getUserDetails(req, res) {
    const userId = req.user.userId;

    try {
        const user = await userModel.getUserById(userId);
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving user details' });
    }
}


async function getCryptoRates(req, res) {
    const userId = req.user.userId
    try {
        // Fetch cryptocurrency rates from CoinGecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd', // You can change the currency if needed
                order: 'market_cap_desc',
                per_page: 75,
                page: 1,
                sparkline: false,
            },
        });

        const cryptoRates = response.data;
        const user = await userModel.getUserById(userId);

        res.json({cryptoRates, user});
    } catch (error) {
        res.status(500).send('Error fetching crypto rates OR API LIMIT REACHED');
    }
}

module.exports = {
    getUserDetails,
    getCryptoRates,
};
