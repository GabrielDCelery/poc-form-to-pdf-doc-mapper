import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/upload' className='nav-link'>Upload</Link>
            </li>
            <li className="nav-item">
              <Link to='/configure' className='nav-link'>Configure</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}