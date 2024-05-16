// Import the modules we need
var express = require ('express')
const session = require('express-session');
var bodyParser= require ('body-parser')
const cors = require("cors");
const dotenv =require('dotenv');
dotenv.config();
const path =require('path')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');

// Create the express application object
const mysql = require('mysql');
const db = require('./configs/db');
const app = express()
const { OpenAI } = require('openai');

// const authController = require('./controllers/authController');
const openai = new OpenAI({apiKey: "sk-proj-Y5QfScTRHFI20sTozFoET3BlbkFJXr7DSpaexo3dUGbAtrDS"});

const  PORT= process.env.PORT || 3301
const JWT_SECRET=process.env.JWT_SECRET_KEY


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: JWT_SECRET, resave: true, saveUninitialized: true }));

// Connect to DB 
db;

// const authenticateToken = require('./middlewares/authMiddleware');
// app.use(authenticateToken);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const searchRoutes = require('./routes/searchRoutes');
const addCustomCoinRoutes = require('./routes/addCustomCoinRoutes');
const weeklyRoutes = require('./routes/weeklyRoutes');
const chartRoutes = require('./routes/chartRoutes');
const addAlertRoutes = require('./routes/addAlertRoutes');
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/search', searchRoutes);
app.use('/addcustomcoin', addCustomCoinRoutes);
app.use('/weeklyprices', weeklyRoutes);
app.use('/chart', chartRoutes);
app.use('/addalert', addAlertRoutes);
// Set up css


app.use(express.static(__dirname + '/public'));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory



// Set the views folder as the root for res.sendFile
const viewsPath = path.join(__dirname, 'views');



app.set('view engine', 'html');


require("./routes/main")(app);

app.post('/chatbot', async (req, res) => {
    const question=req.body.message;

    //This api fetches the current prices and then modify it to string like showing in the 'cryptoPrices'.
    //Currently uncommented to avoid extra API requests 

  //   const rates = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
  //     params: {
  //         vs_currency: 'usd', // You can change the currency if needed
  //         order: 'market_cap_desc',
  //         per_page: 75,
  //         page: 1,
  //         sparkline: false,
  //     },
  // });

  // const cryptoRates = rates.data;
  // function formatCryptoData(data) {
  //   let formattedString = "";
  //   data.forEach(crypto => {
  //     formattedString += `[${crypto.symbol}] ${crypto.name} ${crypto.current_price}, `;
  //   });
  //   // Remove the trailing comma and space
  //   formattedString = formattedString.slice(0, -2);
  //   return formattedString;
  // }
  
  // const formattedData = formatCryptoData(cryptoRates);


  const cryptoPrices =`[btc] Bitcoin 62134, [eth] Ethereum 3183.11, [usdt] Tether 0.999158, [bnb] BNB 584.84, [sol] Solana 135.06, [usdc] USDC 1.001, 
  [steth] Lido Staked Ether 3182.31, [xrp] XRP 0.503052, [doge] Dogecoin 0.141157, [ton] Toncoin 5.24, [ada] Cardano 0.45072, [shib] Shiba Inu 0.00002342, [avax] Avalanche 33.14, [trx] TRON 0.119312, [wbtc] Wrapped Bitcoin 62180, [bch] Bitcoin Cash 455.01, [dot] Polkadot 6.57, [link] Chainlink 13.96, [near] NEAR Protocol 6.88, [matic] Polygon 0.703333, [icp] Internet Computer 13.39, [ltc] Litecoin 82.46, [uni] Uniswap 7.61, [leo] LEO Token 5.73, [dai] Dai 0.99879, [fdusd] First Digital USD 0.999414, [etc] Ethereum Classic 27.26, [apt] Aptos 8.91, [hbar] Hedera 0.101882, [stx] Stacks 2.38, [cro] Cronos 0.12744, [mnt] Mantle 1.036, [xlm] Stellar 0.110758, [fil] Filecoin 5.79, [ezeth] Renzo Restaked ETH 3140.23, [atom] Cosmos Hub 8.01, [okb] OKB 51.02, [xt] XT.com 3.05, [rndr] Render 7.8, [imx] Immutable 2.01, [pepe] Pepe 0.00000687, [arb] Arbitrum 1.056, [vet] VeChain 0.03831153, 
  [mkr] Maker 2949.68, [tao] Bittensor 409.13, [op] Optimism 2.54, [weeth] Wrapped eETH 3298.55, [wif] dogwifhat 2.61, [kas] Kaspa 0.112741, [grt] The Graph 0.249031, [usde] Ethena USDe 0.999914, [ar] Arweave 35.77, [inj] Injective 25.41, [xmr] Monero 122.93, [fet] Fetch.ai 2.14, [theta] Theta Network 2.17, [ftm] Fantom 0.711213, [ldo] Lido DAO 2.13, [core] Core 2.08, [reth] Rocket Pool ETH 3516.65, [tia] Celestia 9.64, [sei] Sei 0.604068, [rune] THORChain 4.96, [bgb] Bitget Token 1.16, [bonk] Bonk 0.0000243, [floki] FLOKI 0.00016272, [meth] Mantle Staked Ether 3257.83, [sui] Sui 1.19, [gala] GALA 0.04384894, [algo] Algorand 0.186183, [zbc] Zebec Protocol 0.02896807, [qnt] Quant 101.23, [wbt] WhiteBIT Coin 10.19, [beam] Beam 0.02568067, [jup] Jupiter 0.97167`

   const context="Navigation: Click on the Logo in the top left corner to go to Homepage or click on Home button in the navbar, click on About button in the navbar to go to ABOUT page. To login, click on the Sign In button in the top right side. To sign up, click on the Sign up button in the top right corner in Navbar. Sign in will need Username and Password. Signup will need email, username and password. If question is irrelevant say 'Sorry I don't have information' "
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
        {
          inputs: {
            question: question,
            context: context + cryptoPrices
          }
        },
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
          },
        }
      );
    
      if (response.status === 200) {
        return res.json({ answer: response.data.answer });
      } else {
        return res.status(response.status).json({ error: "Unexpected status code" });
      }
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

// Start the web app listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

