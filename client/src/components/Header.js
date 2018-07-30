import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {
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
                        <input type="text" className="form-control" placeholder="Search" />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </nav>
        </div>
    );
  }
}

export default Header;
