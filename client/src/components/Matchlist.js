import React, { Component } from 'react';
import '../styles/Matchlist.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchMatches, addMatches, updateEndIndex } from '../actions/Actions';
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
        search: state.search,
        matches: state.matches,
        endIndex: state.endIndex,
        id: state.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchMatches: matches => dispatch(searchMatches(matches)),
        addMatches: matches => dispatch(addMatches(matches)),
        updateEndIndex: index => dispatch(updateEndIndex(index))
    };
};

class Matchlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            cardStatus: []
        }

        // Blocker to prevent double clicking
        this.nextDisable = false;
        this.noMoreGames = false;
    }

    componentDidMount = () => {
        axios.get('/v1/api/getMatches', {
            params: {
                endIndex: this.props.endIndex,
                userID: this.props.match.params.id
            }
        })
        .then((response) => {
            this.setState({
                 loading: false
            });
            // Update match list
            this.props.searchMatches(response.data.matches);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            axios.get('/v1/api/getMatches', {
                params: {
                    endIndex: 5,
                    userID: this.props.id
                }
            })
            .then((response) => {
                // Update match list
                this.props.searchMatches(response.data.matches);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    getNextResults = () => {
        if (!this.nextDisable) {
            // Pevent double clicking
            this.nextDisable = true;

            axios.get('/v1/api/getMatches', {
                params: {
                    endIndex: this.props.endIndex + 5,
                    userID: this.props.match.params.id
                }
            })
            .then((response) => {
                // Prevent further searches if we reach the end
                if ((this.props.endIndex + 5) >= response.data.totalGames) {
                    this.noMoreGames = true;
                }

                // Update matches
                this.props.addMatches(response.data.matches);

                // Update endIndex
                this.props.updateEndIndex(this.props.endIndex + 5);

                // Unblock
                this.nextDisable = false;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

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
    }

    render() {
        // Render nothing to the screen until componentDidMount is ready
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="Matchlist">
                {this.props.matches.map((card, index) => (
                    <Card className={"match-card " + (card.participantInfo.stats.win ? "win-card" : "lose-card")} key={index}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="ChampImage"
                                    className="champ-image"
                                    alt="Champion"
                                    src={card.participantInfo.championName ? CHAMP_IMG + card.participantInfo.championName.champImage : ""}
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
                                        {card.participantInfo.championName ? "Champion Name - " + card.participantInfo.championName.champName : ""}
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
                                    {card.participantInfo.spellsUsed && card.participantInfo.spellsUsed.map((spell, index) => (
                                        <span className="spell-info" key={index}>
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
                                    {card.participantInfo.itemsBought && card.participantInfo.itemsBought.map((item, index) => {
                                        return (item !== "") ?
                                            <span className="item-info" key={index}>
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
                {this.props.matches.length > 0 ?
                    <button
                        type="submit"
                        className="btn btn-primary more-button"
                        disabled={this.noMoreGames}
                        onClick={this.getNextResults}
                        >
                        View More
                    </button>
                    :
                    ""
                }
            </div>
        );
    }
}

const MatchPage = connect(mapStateToProps, mapDispatchToProps)(Matchlist);

export default MatchPage;
