const axios = require('axios');
const userModel = require('../models/userModel');
const apiKey = process.env.alphaVantageApiKeys; 

// Handle the form submission
async function getWeeklyPrices(req, res) {
    const userId = req.user.userId; 
    const user = await userModel.getUserById(userId);
    try {
        const { base, quote } = req.body;
        const apiUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${base}&market=${quote}&apikey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const weeklyPrices = response.data['Time Series (Digital Currency Weekly)'];
        const quoteUpper=  await quote?.toUpperCase();
        // Extract only the weekly open prices
        const weeklyOpenPrices = Object.entries(weeklyPrices).map(([date, data]) => ({
            date,
            open: data[`1a. open (${quoteUpper})`]
        }));

        res.send( { weeklyOpenPrices, user });
    } catch (error) {
        res.status(500).send('Error fetching weekly prices or API rate limit which 25 requests per day reached.');
    }
}

module.exports = {
    getWeeklyPrices,
};
