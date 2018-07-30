// Use dotenv to read .env vars into Node
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.REACT_APP_API_KEY;

app.get('/v1/api/getUserID', (req, res) => {
    const data = {};

    // const promiseID = new Promise((resolve, reject) => {
    //     axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.query.searchValue, {
    //         params: {
    //             api_key: key
    //         }
    //     })
    //     .then((response) => {
    //         resolve(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // });

    // Promise.all([promiseID]).then((value) => {
    //     console.log(value);
    // });

    // Call League API to get user ID
    axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.query.searchValue, {
        params: {
            api_key: key
        }
    })
    .then((response) => {
        // Add User ID and Summoner Name to data object
        data.ID = response.data.accountId;
        data.name = response.data.name;
        data.matches = [];

        // Use User ID to get list of recent matches
        // Return 10 matches at a time
        axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + response.data.accountId, {
            params: {
                beginIndex: req.query.endIndex - 10,
                endIndex: req.query.endIndex,
                api_key: key
            }
        })
        .then((response) => {
            console.log(response.data.matches);

            // If no recent matches are found, return matches as empty array
            if (response.data.matches.length === 0) {
                res.send(data);
            } else {
                // Add match ID to data.matches array
                response.data.matches.forEach((match) => {
                    data.matches.push(match.gameId);
                });

                res.send(data);
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/v1/api/getMatches', (req, res) => {
    // Use User ID to get list of recent matches
    // Return 10 matches at a time
    // axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + req.query.userID, {
    //     params: {
    //         beginIndex: req.query.endIndex - 10,
    //         endIndex: req.query.endIndex,
    //         api_key: key
    //     }
    // })
    // .then((response) => {

    // })
    // .catch((error) => {
    //     console.log(error);
    // })
});

app.listen(port, () => console.log(`Listening on port ${port}`));