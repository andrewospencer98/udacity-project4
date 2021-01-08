var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv')
const fetch = require("node-fetch");
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/getSentiment', callSentimentApi);

dotenv.config()

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
const key = process.env.API_KEY;




function callSentimentApi(req, res){
    getSentiment(baseURL, key, req.body.text)
    .then(function(data){
        res.send({agreement: data.agreement, subjectivity: data.subjectivity});
    })
};

const getSentiment = async (baseURL, key, text)=>{
    const full_url = baseURL+key+'&of=json&txt='+text+'&lang=en';
    const res = await fetch(full_url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

app.get('/all', getData);

function getData(req,res){
    res.send(sentimentData);
}