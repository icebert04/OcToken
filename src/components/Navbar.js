import React, { Component } from 'react'
import Octo from '../Octopus.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/">
          <div className="navbar-icon d-inline-block align-top">
                <img src={Octo} width="100" height="95" alt="purple octopus" />
                <p><b>OcToken</b></p>
          </div>
        </a>
            <small>
              <p>Address:</p>
              <span>{this.props.account}</span>
            </small>
      </nav>
    );
  }
}

export default Navbar;
