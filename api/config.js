const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { default: Axios } = require("axios");
const qs = require("qs");

const app = express();

app.get('/api/config', (req, res) => {
    res.send({ 
        "Status": "Success",
        "Url": "https://b19jkfkt-3001.asse.devtunnels.ms",
    });
});

app.get('/', (req, res) => {
    res.send({ 
        "Status": "Success",
    });
});

module.exports = app;