const axios=require('axios');
const path =require('path')
const viewsPath = path.join(__dirname, '../views');
module.exports = async function (app) {


  // General Routes
  app.get('/', function (req, res) {
    res.sendFile('index.html', { root: viewsPath, user: req.user });
});
app.get('/about', function (req, res) {
    res.sendFile('about.html', { root: viewsPath, user: req.user });
});


}       
