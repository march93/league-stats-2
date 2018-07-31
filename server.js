// Use dotenv to read .env vars into Node
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.REACT_APP_API_KEY;
let champList;
let itemList;
let spellsList;

// CHAMPS
getChampions = () => {
    return promise = new Promise((resolve, reject) => {
        // Call League API to get champion names
        axios.get('https://na1.api.riotgames.com/lol/static-data/v3/champions', {
            params: {
                api_key: key
            }
        })
        .then((response) => {
            // Change to array
            resolve(Object.values(response.data.data));
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// ITEMS
getItems = () => {
    return promise = new Promise((resolve, reject) => {
        // Call League API to get items list
        axios.get('https://na1.api.riotgames.com/lol/static-data/v3/items', {
            params: {
                api_key: key
            }
        })
        .then((response) => {
            // Change to array
            resolve(Object.values(response.data.data));
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// SPELLS
getSpells = () => {
    return promise = new Promise((resolve, reject) => {
        // Call League API to get spells list
        axios.get('https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells', {
            params: {
                tags: 'image',
                api_key: key
            }
        })
        .then((response) => {
            // Change to array
            resolve(Object.values(response.data.data));
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// Resolve champs, items. spells promises
Promise.all([getChampions(), getItems(), getSpells()])
    .then((values) => {
        champList = values[0];
        itemList = values[1];
        spellsList = values[2];
    })
    .catch((error) => {
        console.log(error);
    });

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

    // Resolve promises to get champion name, items bought, and spells used
    Promise.all([
        getChampName(parseInt(userInfo.championId)),
        getItemsBought([
            parseInt(userInfo.stats.item0),
            parseInt(userInfo.stats.item1),
            parseInt(userInfo.stats.item2),
            parseInt(userInfo.stats.item3),
            parseInt(userInfo.stats.item4),
            parseInt(userInfo.stats.item5),
            parseInt(userInfo.stats.item6)
        ]),
        getSpellsUsed([
            parseInt(userInfo.spell1Id),
            parseInt(userInfo.spell2Id)
        ])
    ])
    .then((values) => {
        userInfo.championName = values[0];
        userInfo.itemsBought = values[1];
        userInfo.spellsUsed = values[2];
    })
    .catch((error) => {
        console.log(error);
    });

    return userInfo;
}

getChampName = (champID) => {
    return promise = new Promise((resolve, reject) => {
        // Find champ name
        var champObj = champList.find((champ) => {
            return parseInt(champ.id) === champID;
        });

        if (champObj) {
            resolve(champObj.name);
        } else {
            reject("Champion Not Found");
        }
    });
}

getItemsBought = (items) => {
    return promise = new Promise((resolve, reject) => {
        const itemNameArr = items.map((item) => {
            // No item used
            if (item !== 0) {
                const itemObj = itemList.find((i) => {
                    return parseInt(i.id) === item;
                });

                return itemObj.name;
            } else {
                return "";
            }
        });

        if (itemNameArr) {
            resolve(itemNameArr);
        } else {
            reject("Cannot get items bought");
        }
    });
}

getSpellsUsed = (spells) => {
    return promise = new Promise((resolve, reject) => {
        const spellNameArr = spells.map((spell) => {
            // No spell used
            if (spell !== 0) {
                const spellObj = spellsList.find((s) => {
                    return parseInt(s.id) === spell;
                });

                return { spellName: spellObj.name, spellImage: spellObj.image.full };
            } else {
                return "";
            }
        });

        if (spellNameArr) {
            resolve(spellNameArr);
        } else {
            reject("Cannot get spells used");
        }
    });
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
            Promise.all(promiseArr)
                .then((value) => {
                    res.send(value);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
    .catch((error) => {
        console.log(error);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));