import React, { Component } from 'react';
import '../styles/Matchlist.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchMatches, updateEndIndex } from '../actions/Actions';
import { CHAMP_IMG, SPELL_IMG } from '../constants/Constants';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

momentDurationFormatSetup(moment);

const mapStateToProps = state => {
    return {
        matches: state.matches,
        endIndex: state.endIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchMatches: matches => dispatch(searchMatches(matches)),
        updateEndIndex: index => dispatch(updateEndIndex(index))
    };
};

class Matchlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            cardStatus: [],
            data:
                [
                    {
                        "gameDuration": 2576,
                        "participantInfo": {
                            "participantId": 2,
                            "teamId": 100,
                            "championId": 51,
                            "spell1Id": 7,
                            "spell2Id": 4,
                            "highestAchievedSeasonTier": "PLATINUM",
                            "stats": {
                                "participantId": 2,
                                "win": true,
                                "item0": 3031,
                                "item1": 3006,
                                "item2": 3095,
                                "item3": 3094,
                                "item4": 3072,
                                "item5": 0,
                                "item6": 3340,
                                "kills": 5,
                                "deaths": 10,
                                "assists": 9,
                                "largestKillingSpree": 0,
                                "largestMultiKill": 1,
                                "killingSprees": 0,
                                "longestTimeSpentLiving": 715,
                                "doubleKills": 0,
                                "tripleKills": 0,
                                "quadraKills": 0,
                                "pentaKills": 0,
                                "unrealKills": 0,
                                "totalDamageDealt": 236402,
                                "magicDamageDealt": 9944,
                                "physicalDamageDealt": 219996,
                                "trueDamageDealt": 6461,
                                "largestCriticalStrike": 1391,
                                "totalDamageDealtToChampions": 31733,
                                "magicDamageDealtToChampions": 3121,
                                "physicalDamageDealtToChampions": 25680,
                                "trueDamageDealtToChampions": 2930,
                                "totalHeal": 2338,
                                "totalUnitsHealed": 2,
                                "damageSelfMitigated": 10781,
                                "damageDealtToObjectives": 19672,
                                "damageDealtToTurrets": 7993,
                                "visionScore": 24,
                                "timeCCingOthers": 22,
                                "totalDamageTaken": 30491,
                                "magicalDamageTaken": 22003,
                                "physicalDamageTaken": 6716,
                                "trueDamageTaken": 1770,
                                "goldEarned": 16191,
                                "goldSpent": 14800,
                                "turretKills": 3,
                                "inhibitorKills": 1,
                                "totalMinionsKilled": 251,
                                "neutralMinionsKilled": 26,
                                "neutralMinionsKilledTeamJungle": 13,
                                "neutralMinionsKilledEnemyJungle": 0,
                                "totalTimeCrowdControlDealt": 370,
                                "champLevel": 17,
                                "visionWardsBoughtInGame": 0,
                                "sightWardsBoughtInGame": 0,
                                "wardsPlaced": 8,
                                "wardsKilled": 4,
                                "firstBloodKill": false,
                                "firstBloodAssist": false,
                                "firstTowerKill": true,
                                "firstTowerAssist": false,
                                "firstInhibitorKill": true,
                                "firstInhibitorAssist": false,
                                "combatPlayerScore": 0,
                                "objectivePlayerScore": 0,
                                "totalPlayerScore": 0,
                                "totalScoreRank": 0,
                                "playerScore0": 0,
                                "playerScore1": 0,
                                "playerScore2": 0,
                                "playerScore3": 0,
                                "playerScore4": 0,
                                "playerScore5": 0,
                                "playerScore6": 0,
                                "playerScore7": 0,
                                "playerScore8": 0,
                                "playerScore9": 0,
                                "perk0": 8005,
                                "perk0Var1": 3974,
                                "perk0Var2": 2890,
                                "perk0Var3": 1083,
                                "perk1": 9111,
                                "perk1Var1": 669,
                                "perk1Var2": 0,
                                "perk1Var3": 0,
                                "perk2": 9104,
                                "perk2Var1": 22,
                                "perk2Var2": 40,
                                "perk2Var3": 0,
                                "perk3": 8014,
                                "perk3Var1": 452,
                                "perk3Var2": 0,
                                "perk3Var3": 0,
                                "perk4": 8234,
                                "perk4Var1": 34,
                                "perk4Var2": 0,
                                "perk4Var3": 0,
                                "perk5": 8232,
                                "perk5Var1": 2,
                                "perk5Var2": 0,
                                "perk5Var3": 0,
                                "perkPrimaryStyle": 8000,
                                "perkSubStyle": 8200
                            },
                            "timeline": {
                                "participantId": 2,
                                "creepsPerMinDeltas": {
                                    "10-20": 5.3999999999999995,
                                    "0-10": 6.5,
                                    "30-end": 3.9,
                                    "20-30": 8
                                },
                                "xpPerMinDeltas": {
                                    "10-20": 328.9,
                                    "0-10": 312.5,
                                    "30-end": 483,
                                    "20-30": 542.7
                                },
                                "goldPerMinDeltas": {
                                    "10-20": 350.1,
                                    "0-10": 252.7,
                                    "30-end": 399.7,
                                    "20-30": 413.7
                                },
                                "csDiffPerMinDeltas": {
                                    "10-20": -0.050000000000000266,
                                    "0-10": 0.7500000000000002,
                                    "30-end": -0.65,
                                    "20-30": 2.05
                                },
                                "xpDiffPerMinDeltas": {
                                    "10-20": -57.75,
                                    "0-10": -38.70000000000002,
                                    "30-end": -100.35000000000002,
                                    "20-30": -8.050000000000011
                                },
                                "damageTakenPerMinDeltas": {
                                    "10-20": 519.3,
                                    "0-10": 305.2,
                                    "30-end": 1511.1,
                                    "20-30": 342
                                },
                                "damageTakenDiffPerMinDeltas": {
                                    "10-20": -49.25,
                                    "0-10": -33.70000000000001,
                                    "30-end": 205.05000000000013,
                                    "20-30": -37.150000000000006
                                },
                                "role": "DUO_CARRY",
                                "lane": "BOTTOM"
                            },
                            "userName": "Chopstick",
                            "championName": {
                                "champName": "Caitlyn",
                                "champImage": "Caitlyn.png"
                            },
                            "itemsBought": [
                                "Infinity Edge",
                                "Berserker's Greaves",
                                "Stormrazor",
                                "Rapid Firecannon",
                                "The Bloodthirster",
                                "",
                                "Warding Totem (Trinket)"
                            ],
                            "spellsUsed": [
                                {
                                    "spellName": "Heal",
                                    "spellImage": "SummonerHeal.png"
                                },
                                {
                                    "spellName": "Flash",
                                    "spellImage": "SummonerFlash.png"
                                }
                            ]
                        }
                    },
                    {
                        "gameDuration": 1279,
                        "participantInfo": {
                            "participantId": 1,
                            "teamId": 100,
                            "championId": 62,
                            "spell1Id": 32,
                            "spell2Id": 4,
                            "highestAchievedSeasonTier": "PLATINUM",
                            "stats": {
                                "participantId": 1,
                                "win": false,
                                "item0": 3142,
                                "item1": 3006,
                                "item2": 3147,
                                "item3": 3071,
                                "item4": 3812,
                                "item5": 0,
                                "item6": 2052,
                                "kills": 11,
                                "deaths": 10,
                                "assists": 21,
                                "largestKillingSpree": 3,
                                "largestMultiKill": 1,
                                "killingSprees": 3,
                                "longestTimeSpentLiving": 263,
                                "doubleKills": 0,
                                "tripleKills": 0,
                                "quadraKills": 0,
                                "pentaKills": 0,
                                "unrealKills": 0,
                                "totalDamageDealt": 56139,
                                "magicDamageDealt": 1898,
                                "physicalDamageDealt": 53820,
                                "trueDamageDealt": 420,
                                "largestCriticalStrike": 0,
                                "totalDamageDealtToChampions": 25505,
                                "magicDamageDealtToChampions": 298,
                                "physicalDamageDealtToChampions": 24866,
                                "trueDamageDealtToChampions": 340,
                                "totalHeal": 4449,
                                "totalUnitsHealed": 1,
                                "damageSelfMitigated": 17052,
                                "damageDealtToObjectives": 4197,
                                "damageDealtToTurrets": 4197,
                                "visionScore": 0,
                                "timeCCingOthers": 16,
                                "totalDamageTaken": 24206,
                                "magicalDamageTaken": 9170,
                                "physicalDamageTaken": 11818,
                                "trueDamageTaken": 3218,
                                "goldEarned": 13850,
                                "goldSpent": 13400,
                                "turretKills": 2,
                                "inhibitorKills": 0,
                                "totalMinionsKilled": 44,
                                "neutralMinionsKilled": 0,
                                "totalTimeCrowdControlDealt": 25,
                                "champLevel": 18,
                                "visionWardsBoughtInGame": 0,
                                "sightWardsBoughtInGame": 0,
                                "firstBloodKill": false,
                                "firstBloodAssist": false,
                                "firstTowerKill": false,
                                "firstTowerAssist": false,
                                "firstInhibitorKill": false,
                                "firstInhibitorAssist": true,
                                "combatPlayerScore": 0,
                                "objectivePlayerScore": 0,
                                "totalPlayerScore": 0,
                                "totalScoreRank": 0,
                                "playerScore0": 0,
                                "playerScore1": 0,
                                "playerScore2": 0,
                                "playerScore3": 6,
                                "playerScore4": 0,
                                "playerScore5": 0,
                                "playerScore6": 0,
                                "playerScore7": 0,
                                "playerScore8": 0,
                                "playerScore9": 0,
                                "perk0": 8128,
                                "perk0Var1": 4001,
                                "perk0Var2": 0,
                                "perk0Var3": 0,
                                "perk1": 8143,
                                "perk1Var1": 1508,
                                "perk1Var2": 0,
                                "perk1Var3": 0,
                                "perk2": 8138,
                                "perk2Var1": 18,
                                "perk2Var2": 0,
                                "perk2Var3": 0,
                                "perk3": 8135,
                                "perk3Var1": 5,
                                "perk3Var2": 0,
                                "perk3Var3": 0,
                                "perk4": 9111,
                                "perk4Var1": 1749,
                                "perk4Var2": 0,
                                "perk4Var3": 0,
                                "perk5": 8014,
                                "perk5Var1": 648,
                                "perk5Var2": 0,
                                "perk5Var3": 0,
                                "perkPrimaryStyle": 8100,
                                "perkSubStyle": 8000
                            },
                            "timeline": {
                                "participantId": 1,
                                "creepsPerMinDeltas": {
                                    "10-20": 2.2,
                                    "0-10": 2.2
                                },
                                "xpPerMinDeltas": {
                                    "10-20": 1291.1,
                                    "0-10": 727.4000000000001
                                },
                                "goldPerMinDeltas": {
                                    "10-20": 675.1,
                                    "0-10": 523.2
                                },
                                "damageTakenPerMinDeltas": {
                                    "10-20": 1444.6999999999998,
                                    "0-10": 696.7
                                },
                                "role": "DUO_SUPPORT",
                                "lane": "TOP"
                            },
                            "userName": "Chopstick",
                            "championName": {
                                "champName": "Wukong",
                                "champImage": "MonkeyKing.png"
                            },
                            "itemsBought": [
                                "Youmuu's Ghostblade",
                                "Berserker's Greaves",
                                "Duskblade of Draktharr",
                                "The Black Cleaver",
                                "Death's Dance",
                                "",
                                "Poro-Snax"
                            ],
                            "spellsUsed": [
                                {
                                    "spellName": "Mark",
                                    "spellImage": "SummonerSnowball.png"
                                },
                                {
                                    "spellName": "Flash",
                                    "spellImage": "SummonerFlash.png"
                                }
                            ]
                        }
                    },
                    {
                        "gameDuration": 1229,
                        "participantInfo": {
                            "participantId": 2,
                            "teamId": 100,
                            "championId": 161,
                            "spell1Id": 32,
                            "spell2Id": 4,
                            "highestAchievedSeasonTier": "PLATINUM",
                            "stats": {
                                "participantId": 2,
                                "win": true,
                                "item0": 3285,
                                "item1": 3135,
                                "item2": 3165,
                                "item3": 3089,
                                "item4": 3020,
                                "item5": 0,
                                "item6": 2052,
                                "kills": 18,
                                "deaths": 6,
                                "assists": 25,
                                "largestKillingSpree": 6,
                                "largestMultiKill": 3,
                                "killingSprees": 5,
                                "longestTimeSpentLiving": 257,
                                "doubleKills": 3,
                                "tripleKills": 2,
                                "quadraKills": 0,
                                "pentaKills": 0,
                                "unrealKills": 0,
                                "totalDamageDealt": 107995,
                                "magicDamageDealt": 98844,
                                "physicalDamageDealt": 2910,
                                "trueDamageDealt": 6241,
                                "largestCriticalStrike": 0,
                                "totalDamageDealtToChampions": 38081,
                                "magicDamageDealtToChampions": 34621,
                                "physicalDamageDealtToChampions": 233,
                                "trueDamageDealtToChampions": 3227,
                                "totalHeal": 1377,
                                "totalUnitsHealed": 1,
                                "damageSelfMitigated": 5000,
                                "damageDealtToObjectives": 2364,
                                "damageDealtToTurrets": 2364,
                                "visionScore": 0,
                                "timeCCingOthers": 38,
                                "totalDamageTaken": 13267,
                                "magicalDamageTaken": 5215,
                                "physicalDamageTaken": 7344,
                                "trueDamageTaken": 707,
                                "goldEarned": 15254,
                                "goldSpent": 13550,
                                "turretKills": 1,
                                "inhibitorKills": 0,
                                "totalMinionsKilled": 85,
                                "neutralMinionsKilled": 0,
                                "totalTimeCrowdControlDealt": 458,
                                "champLevel": 18,
                                "visionWardsBoughtInGame": 0,
                                "sightWardsBoughtInGame": 0,
                                "firstBloodKill": false,
                                "firstBloodAssist": false,
                                "firstTowerKill": false,
                                "firstTowerAssist": true,
                                "firstInhibitorKill": false,
                                "firstInhibitorAssist": false,
                                "combatPlayerScore": 0,
                                "objectivePlayerScore": 0,
                                "totalPlayerScore": 0,
                                "totalScoreRank": 0,
                                "playerScore0": 0,
                                "playerScore1": 0,
                                "playerScore2": 0,
                                "playerScore3": 4,
                                "playerScore4": 0,
                                "playerScore5": 0,
                                "playerScore6": 0,
                                "playerScore7": 0,
                                "playerScore8": 0,
                                "playerScore9": 0,
                                "perk0": 8229,
                                "perk0Var1": 3134,
                                "perk0Var2": 0,
                                "perk0Var3": 0,
                                "perk1": 8226,
                                "perk1Var1": 250,
                                "perk1Var2": 233,
                                "perk1Var3": 0,
                                "perk2": 8210,
                                "perk2Var1": 0,
                                "perk2Var2": 0,
                                "perk2Var3": 0,
                                "perk3": 8236,
                                "perk3Var1": 24,
                                "perk3Var2": 0,
                                "perk3Var3": 0,
                                "perk4": 8009,
                                "perk4Var1": 6789,
                                "perk4Var2": 230,
                                "perk4Var3": 0,
                                "perk5": 8014,
                                "perk5Var1": 814,
                                "perk5Var2": 0,
                                "perk5Var3": 0,
                                "perkPrimaryStyle": 8200,
                                "perkSubStyle": 8000
                            },
                            "timeline": {
                                "participantId": 2,
                                "creepsPerMinDeltas": {
                                    "10-20": 5,
                                    "0-10": 3.4000000000000004
                                },
                                "xpPerMinDeltas": {
                                    "10-20": 1223.1,
                                    "0-10": 718.4000000000001
                                },
                                "goldPerMinDeltas": {
                                    "10-20": 737.1,
                                    "0-10": 562.4000000000001
                                },
                                "damageTakenPerMinDeltas": {
                                    "10-20": 814.2,
                                    "0-10": 450.4
                                },
                                "role": "DUO",
                                "lane": "TOP"
                            },
                            "userName": "Chopstick",
                            "championName": {
                                "champName": "Vel'Koz",
                                "champImage": "Velkoz.png"
                            },
                            "itemsBought": [
                                "Luden's Echo",
                                "Void Staff",
                                "Morellonomicon",
                                "Rabadon's Deathcap",
                                "Sorcerer's Shoes",
                                "",
                                "Poro-Snax"
                            ],
                            "spellsUsed": [
                                {
                                    "spellName": "Mark",
                                    "spellImage": "SummonerSnowball.png"
                                },
                                {
                                    "spellName": "Flash",
                                    "spellImage": "SummonerFlash.png"
                                }
                            ]
                        }
                    },
                    {
                        "gameDuration": 1328,
                        "participantInfo": {
                            "participantId": 4,
                            "teamId": 100,
                            "championId": 8,
                            "spell1Id": 32,
                            "spell2Id": 4,
                            "highestAchievedSeasonTier": "PLATINUM",
                            "stats": {
                                "participantId": 4,
                                "win": false,
                                "item0": 3152,
                                "item1": 3020,
                                "item2": 3065,
                                "item3": 1026,
                                "item4": 3136,
                                "item5": 3157,
                                "item6": 2052,
                                "kills": 6,
                                "deaths": 12,
                                "assists": 22,
                                "largestKillingSpree": 2,
                                "largestMultiKill": 1,
                                "killingSprees": 1,
                                "longestTimeSpentLiving": 233,
                                "doubleKills": 0,
                                "tripleKills": 0,
                                "quadraKills": 0,
                                "pentaKills": 0,
                                "unrealKills": 0,
                                "totalDamageDealt": 76118,
                                "magicDamageDealt": 70946,
                                "physicalDamageDealt": 3797,
                                "trueDamageDealt": 1375,
                                "largestCriticalStrike": 0,
                                "totalDamageDealtToChampions": 21981,
                                "magicDamageDealtToChampions": 19812,
                                "physicalDamageDealtToChampions": 1599,
                                "trueDamageDealtToChampions": 570,
                                "totalHeal": 22493,
                                "totalUnitsHealed": 1,
                                "damageSelfMitigated": 29494,
                                "damageDealtToObjectives": 465,
                                "damageDealtToTurrets": 465,
                                "visionScore": 0,
                                "timeCCingOthers": 5,
                                "totalDamageTaken": 47247,
                                "magicalDamageTaken": 28910,
                                "physicalDamageTaken": 14897,
                                "trueDamageTaken": 3439,
                                "goldEarned": 12969,
                                "goldSpent": 11650,
                                "turretKills": 0,
                                "inhibitorKills": 0,
                                "totalMinionsKilled": 54,
                                "neutralMinionsKilled": 0,
                                "totalTimeCrowdControlDealt": 103,
                                "champLevel": 18,
                                "visionWardsBoughtInGame": 0,
                                "sightWardsBoughtInGame": 0,
                                "firstBloodKill": false,
                                "firstBloodAssist": false,
                                "firstTowerKill": false,
                                "firstTowerAssist": false,
                                "firstInhibitorKill": false,
                                "firstInhibitorAssist": false,
                                "combatPlayerScore": 0,
                                "objectivePlayerScore": 0,
                                "totalPlayerScore": 0,
                                "totalScoreRank": 0,
                                "playerScore0": 0,
                                "playerScore1": 0,
                                "playerScore2": 0,
                                "playerScore3": 4,
                                "playerScore4": 0,
                                "playerScore5": 0,
                                "playerScore6": 0,
                                "playerScore7": 0,
                                "playerScore8": 0,
                                "playerScore9": 0,
                                "perk0": 8230,
                                "perk0Var1": 13,
                                "perk0Var2": 0,
                                "perk0Var3": 0,
                                "perk1": 8224,
                                "perk1Var1": 1083,
                                "perk1Var2": 0,
                                "perk1Var3": 0,
                                "perk2": 8210,
                                "perk2Var1": 0,
                                "perk2Var2": 0,
                                "perk2Var3": 0,
                                "perk3": 8236,
                                "perk3Var1": 24,
                                "perk3Var2": 0,
                                "perk3Var3": 0,
                                "perk4": 9111,
                                "perk4Var1": 3798,
                                "perk4Var2": 0,
                                "perk4Var3": 0,
                                "perk5": 8014,
                                "perk5Var1": 416,
                                "perk5Var2": 0,
                                "perk5Var3": 0,
                                "perkPrimaryStyle": 8200,
                                "perkSubStyle": 8000
                            },
                            "timeline": {
                                "participantId": 4,
                                "creepsPerMinDeltas": {
                                    "10-20": 2.9,
                                    "0-10": 2.2
                                },
                                "xpPerMinDeltas": {
                                    "10-20": 1112.8000000000002,
                                    "0-10": 769.5
                                },
                                "goldPerMinDeltas": {
                                    "10-20": 555.5,
                                    "0-10": 514.2
                                },
                                "damageTakenPerMinDeltas": {
                                    "10-20": 2864.9,
                                    "0-10": 1335.8
                                },
                                "role": "SOLO",
                                "lane": "TOP"
                            },
                            "userName": "Chopstick",
                            "championName": {
                                "champName": "Vladimir",
                                "champImage": "Vladimir.png"
                            },
                            "itemsBought": [
                                "Hextech Protobelt-01",
                                "Sorcerer's Shoes",
                                "Spirit Visage",
                                "Blasting Wand",
                                "Haunting Guise",
                                "Zhonya's Hourglass",
                                "Poro-Snax"
                            ],
                            "spellsUsed": [
                                {
                                    "spellName": "Mark",
                                    "spellImage": "SummonerSnowball.png"
                                },
                                {
                                    "spellName": "Flash",
                                    "spellImage": "SummonerFlash.png"
                                }
                            ]
                        }
                    },
                    {
                        "gameDuration": 1359,
                        "participantInfo": {
                            "participantId": 10,
                            "teamId": 200,
                            "championId": 31,
                            "spell1Id": 32,
                            "spell2Id": 4,
                            "highestAchievedSeasonTier": "PLATINUM",
                            "stats": {
                                "participantId": 10,
                                "win": false,
                                "item0": 3029,
                                "item1": 3111,
                                "item2": 3065,
                                "item3": 3001,
                                "item4": 3151,
                                "item5": 0,
                                "item6": 2052,
                                "kills": 11,
                                "deaths": 15,
                                "assists": 18,
                                "largestKillingSpree": 2,
                                "largestMultiKill": 2,
                                "killingSprees": 3,
                                "longestTimeSpentLiving": 124,
                                "doubleKills": 2,
                                "tripleKills": 0,
                                "quadraKills": 0,
                                "pentaKills": 0,
                                "unrealKills": 0,
                                "totalDamageDealt": 51751,
                                "magicDamageDealt": 34079,
                                "physicalDamageDealt": 7941,
                                "trueDamageDealt": 9729,
                                "largestCriticalStrike": 0,
                                "totalDamageDealtToChampions": 19623,
                                "magicDamageDealtToChampions": 10778,
                                "physicalDamageDealtToChampions": 3247,
                                "trueDamageDealtToChampions": 5597,
                                "totalHeal": 6477,
                                "totalUnitsHealed": 1,
                                "damageSelfMitigated": 57919,
                                "damageDealtToObjectives": 628,
                                "damageDealtToTurrets": 628,
                                "visionScore": 0,
                                "timeCCingOthers": 102,
                                "totalDamageTaken": 57360,
                                "magicalDamageTaken": 31803,
                                "physicalDamageTaken": 21797,
                                "trueDamageTaken": 3759,
                                "goldEarned": 12972,
                                "goldSpent": 12700,
                                "turretKills": 0,
                                "inhibitorKills": 0,
                                "totalMinionsKilled": 33,
                                "neutralMinionsKilled": 0,
                                "totalTimeCrowdControlDealt": 358,
                                "champLevel": 18,
                                "visionWardsBoughtInGame": 0,
                                "sightWardsBoughtInGame": 0,
                                "firstBloodKill": false,
                                "firstBloodAssist": false,
                                "firstTowerKill": false,
                                "firstTowerAssist": false,
                                "firstInhibitorKill": false,
                                "firstInhibitorAssist": false,
                                "combatPlayerScore": 0,
                                "objectivePlayerScore": 0,
                                "totalPlayerScore": 0,
                                "totalScoreRank": 0,
                                "playerScore0": 0,
                                "playerScore1": 0,
                                "playerScore2": 0,
                                "playerScore3": 8,
                                "playerScore4": 0,
                                "playerScore5": 0,
                                "playerScore6": 0,
                                "playerScore7": 0,
                                "playerScore8": 0,
                                "playerScore9": 0,
                                "perk0": 8465,
                                "perk0Var1": 4017,
                                "perk0Var2": 0,
                                "perk0Var3": 0,
                                "perk1": 8473,
                                "perk1Var1": 439,
                                "perk1Var2": 0,
                                "perk1Var3": 0,
                                "perk2": 8444,
                                "perk2Var1": 2382,
                                "perk2Var2": 0,
                                "perk2Var3": 0,
                                "perk3": 8451,
                                "perk3Var1": 470,
                                "perk3Var2": 0,
                                "perk3Var3": 0,
                                "perk4": 8014,
                                "perk4Var1": 386,
                                "perk4Var2": 0,
                                "perk4Var3": 0,
                                "perk5": 8009,
                                "perk5Var1": 2264,
                                "perk5Var2": 133,
                                "perk5Var3": 0,
                                "perkPrimaryStyle": 8400,
                                "perkSubStyle": 8000
                            },
                            "timeline": {
                                "participantId": 10,
                                "creepsPerMinDeltas": {
                                    "10-20": 1.1,
                                    "0-10": 1.7000000000000002
                                },
                                "xpPerMinDeltas": {
                                    "10-20": 1111,
                                    "0-10": 699.3
                                },
                                "goldPerMinDeltas": {
                                    "10-20": 545.0999999999999,
                                    "0-10": 492.9
                                },
                                "damageTakenPerMinDeltas": {
                                    "10-20": 3177.7,
                                    "0-10": 1600.4
                                },
                                "role": "SOLO",
                                "lane": "TOP"
                            },
                            "userName": "Chopstick",
                            "championName": {
                                "champName": "Cho'Gath",
                                "champImage": "Chogath.png"
                            },
                            "itemsBought": [
                                "Rod of Ages (Quick Charge)",
                                "Mercury's Treads",
                                "Spirit Visage",
                                "Abyssal Mask",
                                "Liandry's Torment",
                                "",
                                "Poro-Snax"
                            ],
                            "spellsUsed": [
                                {
                                    "spellName": "Mark",
                                    "spellImage": "SummonerSnowball.png"
                                },
                                {
                                    "spellName": "Flash",
                                    "spellImage": "SummonerFlash.png"
                                }
                            ]
                        }
                    }
                ]
        }

        // Blocker to prevent double clicking
        this.nextDisable = false;
    }

    // componentDidMount = () => {
    //     axios.get('/v1/api/getMatches', {
    //         params: {
    //             matches: this.props.matches,
    //             endIndex: this.props.endIndex,
    //             userID: this.props.match.params.id
    //         }
    //     })
    //     .then((response) => {
    //         this.setState({
    //              loading: false
    //         });
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    // componentDidUpdate = () => {
    //     axios.get('/v1/api/getMatches', {
    //         params: {
    //             matches: this.props.matches,
    //             endIndex: this.props.endIndex,
    //             userID: this.props.match.params.id
    //         }
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    handleExpandClick = (index) => {
        let cardCopy = this.state.cardStatus.slice();

        // Remove index if found, otherwise add it into array
        if (cardCopy.includes(index)) {
            let cardIndex = cardCopy.indexOf(index);
            cardCopy.splice(cardIndex, 1);
        } else {
            cardCopy.push(index);
        }

        this.setState({
            cardStatus: cardCopy
        });
        console.log(this.state.cardStatus);
    }

    render() {
        // Render nothing to the screen until componentDidMount is ready
        // if (this.state.loading) {
        //     return null;
        // }

        return (
            <div className="Matchlist">
                {this.state.data.map((card, index) => (
                    <Card className={"match-card " + (card.participantInfo.stats.win ? "win-card" : "lose-card")} key={index}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="ChampImage"
                                    className="champ-image"
                                    alt="Champion"
                                    src={CHAMP_IMG + card.participantInfo.championName.champImage}
                                    >
                                </Avatar>
                            }
                            title={card.participantInfo.userName}
                            subheader={card.participantInfo.stats.win ? "WIN" : "DEFEAT"}
                        />
                        <CardContent className="visible-content">
                            <Typography component="span" className="champ-info border-around">
                                <div className="champ-data">
                                    <span>
                                        {"Champion Name - " + card.participantInfo.championName.champName}
                                    </span>
                                    <span>
                                        {"Champion Level - " + card.participantInfo.stats.champLevel}
                                    </span>
                                </div>
                            </Typography>
                            <Typography component="span" className="KDA border-around">
                                <div className="kda-data">
                                    <span className="kda-title">KDA</span>
                                    <span className="kda-ratio">
                                        {card.participantInfo.stats.kills + "/" + card.participantInfo.stats.deaths + "/" + card.participantInfo.stats.assists}
                                    </span>
                                </div>
                            </Typography>
                            <Typography component="span" className="duration border-around">
                                {"Game Duration - " + moment.duration(parseInt(card.gameDuration), "seconds").format("h[h]:mm[mins]:ss[secs]")}
                            </Typography>
                        </CardContent>
                        <CardActions className="card-action" disableActionSpacing>
                            <div className="expand-details">
                                <span>Expand for more details</span>
                                <IconButton
                                    className={classnames("expand", {
                                        ["expand-open"]: this.state.cardStatus.includes(index),
                                    })}
                                    onClick={() => this.handleExpandClick(index)}
                                    aria-expanded={this.state.cardStatus.includes(index)}
                                    aria-label="Show more"
                                    >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </div>
                        </CardActions>
                        <Collapse in={this.state.cardStatus.includes(index)} timeout="auto" unmountOnExit>
                            <CardContent className="hidden-content">
                                <Typography component="div" className="spells-data border-around">
                                    <h2>Spells Used</h2>
                                    {card.participantInfo.spellsUsed.map(spell => (
                                        <span className="spell-info">
                                            <Avatar
                                                aria-label="SpellImage"
                                                className="spell-image"
                                                alt="Spell"
                                                src={SPELL_IMG + spell.spellImage}
                                                >
                                            </Avatar>
                                            <span className="spell-name">
                                                {spell.spellName}
                                            </span>
                                        </span>
                                    ))}
                                </Typography>
                                <Typography component="div" className="items-data border-around">
                                    <h2>Spells Used</h2>
                                    {card.participantInfo.itemsBought.map(item => {
                                        return (item !== "") ?
                                            <span className="item-info">
                                                <DoneIcon />
                                                <span className="item-name">
                                                    {item}
                                                </span>
                                            </span>
                                            :
                                            ""
                                    })}
                                </Typography>
                                <Typography component="div" className="creep-data border-around">
                                    <div>
                                        <h3 className="creep-score">
                                            {"Total Creep Score: " + card.participantInfo.stats.totalMinionsKilled}
                                        </h3>
                                        <h3 className="creep-min">
                                            {"Creeps Per Minute: " + (card.participantInfo.stats.totalMinionsKilled/moment.duration(card.gameDuration, "seconds").asMinutes()).toFixed(2)}
                                        </h3>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}
            </div>
        );
    }
}

const MatchPage = connect(mapStateToProps, mapDispatchToProps)(Matchlist);

export default MatchPage;
