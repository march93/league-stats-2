import React, { Component } from 'react';
import '../styles/Header.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchValue, searchMatches, updateEndIndex } from '../actions/Actions';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router';

const mapStateToProps = state => {
    return { 
        search: state.search,
        matches: state.matches,
        endIndex: state.endIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchValue: value => dispatch(searchValue(value)),
        searchMatches: matches => dispatch(searchMatches(matches)),
        updateEndIndex: index => dispatch(updateEndIndex(index))
    };
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }

        // Blocker to prevent double clicking
        this.nextDisable = false;
    }

    // Access history props for routing as Header component is not part of <Route />
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    // Search by clicking on enter button
    isEnterKey = (event) => {
        if (event.key === "Enter") {
            this.getMatches(event);
        }
    }

    // Handle input changes
    onChangeName = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    }

    getMatches = (event) => {
        event.preventDefault();

        // Call API to retrieve user's ID
        axios.get('/v1/api/getUserID', {
                params: {
                    searchValue: this.state.searchValue,
                    endIndex: this.props.endIndex
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.props.history.push('/matches');
    }

    render() {
        return (
            <div className="Header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">League Stats</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-search" aria-controls="navbar-search" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-search">
                        <form className="navbar-form ml-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Summoner's Name"
                                defaultValue={this.props.searchedValue}
                                onKeyPress={this.isEnterKey}
                                onChange={this.onChangeName}     
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.getMatches}
                                >
                                Submit
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

const HeaderPage = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(HeaderPage)
