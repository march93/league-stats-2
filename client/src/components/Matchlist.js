import React, { Component } from 'react';
import '../styles/Header.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchMatches, updateEndIndex } from '../actions/Actions';

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
            loading: true
        }

        // Blocker to prevent double clicking
        this.nextDisable = false;
    }

    componentDidMount = () => {
        axios.get('/v1/api/getMatches', {
            params: {
                matches: this.props.matches,
                endIndex: this.props.endIndex,
                userID: this.props.match.params.id
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        // Render nothing to the screen until componentDidMount is ready
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="Matchlist">
            </div>
        );
    }
}

const MatchPage = connect(mapStateToProps, mapDispatchToProps)(Matchlist);

export default MatchPage;
