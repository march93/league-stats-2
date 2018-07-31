// Use dotenv to read .env vars into Node
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.REACT_APP_API_KEY;
let champList;
let itemList;

getChampions = () => {
    // Call League API to get champion names
    axios.get('https://na1.api.riotgames.com/lol/static-data/v3/champions', {
        params: {
            api_key: key
        }
    })
    .then((response) => {
        // Change to array
        champList = Object.values(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    });
}
getChampions();

getItems = () => {
    // Call League API to get items list
    axios.get('https://na1.api.riotgames.com/lol/static-data/v3/items', {
        params: {
            api_key: key
        }
    })
    .then((response) => {
        // Change to array
        itemList = Object.values(response.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
}
getItems();

// // Get list of champs (rate limits on League API)
// getChamps = () => {
//     axios.get('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/championFull.json')
//     .then((response) => {
//         champList = response.data.keys;
//         // console.log(response.data.keys, champList);
//         // return response.data.keys;
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// }
// getChamps();

getMatchInfo = (userID, gameID) => {
    return promise = new Promise((resolve, reject) => {
        axios.get('https://na1.api.riotgames.com/lol/match/v3/matches/' + gameID, {
            params: {
                forAccountId: userID,
                api_key: key
            }
        })
        .then((response) => {
            const matchData = {};

            // Set game duration
            matchData.gameDuration = response.data.gameDuration;

            // Retrieve user match info
            const userPromise = Promise.resolve(getUserInfo(userID, response.data));

            userPromise.then((value) => {
                matchData.participantInfo = value;
                resolve(matchData);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            reject(error);
        });
    });
}

getUserInfo = (userID, matchInfo) => {
    // Get user object based on participant ID
    const userObject = matchInfo.participantIdentities.find((identity) => {
        return parseInt(identity.player.accountId) === parseInt(userID);
    });

    // Get user's match info
    const userInfo = matchInfo.participants.find((user) => {
        return parseInt(user.participantId) === parseInt(userObject.participantId);
    });

    const champID = parseInt(userInfo.championId);

    // Find champ name
    var champObj = champList.find((champ) => {
        return parseInt(champ.id) === champID;
    });

    // Append champion name to result
    userInfo.championName = champObj.name;

    return userInfo;
}

app.get('/v1/api/getUserID', (req, res) => {
    // Call League API to get user ID
    axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + req.query.searchValue, {
        params: {
            api_key: key
        }
    })
    .then((response) => {
        res.send({ID: response.data.accountId});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/v1/api/getMatches', (req, res) => {
    // Use User ID to get list of recent matches
    // Return 10 matches at a time
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + req.query.userID, {
        params: {
            beginIndex: req.query.endIndex - 5,
            endIndex: req.query.endIndex,
            api_key: key
        }
    })
    .then((response) => {
        // Eventual object with all the information
        const data = {};

        // Add User ID and Summoner Name to data object
        data.ID = req.query.userID;
        data.matches = [];

        // If no recent matches are found, return matches as empty array
        if (response.data.matches.length === 0) {
            res.send(data);
        } else {
            // promise array
            const promiseArr = [];

            // Add match ID to data.matches array
            response.data.matches.map((match) => {
                // Set each call into a promise array
                promiseArr.push(getMatchInfo(data.ID, match.gameId));
            });

            // Resolve all promises
            Promise.all(promiseArr).then((value) => {
                res.send(value);
            });

            // res.send(data);
        }
    })
    .catch((error) => {
        console.log(error);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));