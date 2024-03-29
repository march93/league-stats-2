import React, { Component } from 'react';
import '../styles/Header.css';
import axios from 'axios';
import { connect } from "react-redux";
import { searchValue, updateEndIndex, updateID } from '../actions/Actions';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

const mapStateToProps = state => {
    return { 
        search: state.search,
        endIndex: state.endIndex,
        id: state.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchValue: value => dispatch(searchValue(value)),
        updateEndIndex: index => dispatch(updateEndIndex(index)),
        updateID: id => dispatch(updateID(id))
    };
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
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

        // Reference context
        const self = this;

        // Call API to retrieve user's ID
        axios.get('/v1/api/getUserID', {
                params: {
                    searchValue: this.state.searchValue
                }
            })
            .then((response) => {
                // Store search value in redux
                self.props.searchValue(self.state.searchValue);

                // Update end index
                this.props.updateEndIndex(5);

                // Update ID
                this.props.updateID(response.data.ID);

                // Navigate to summoner info page
                self.props.history.push('/matches/' + response.data.ID);
            })
            .catch((error) => {
                console.log(error);
            });
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
