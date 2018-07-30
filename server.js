// Use dotenv to read .env vars into Node
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.REACT_APP_API_KEY;

app.get('/v1/api/getUserID', (req, res) => {
    // Call League API to get user ID
    axios.get('', {
        params: {
            
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));