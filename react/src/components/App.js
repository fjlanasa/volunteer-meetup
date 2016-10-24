import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render () {
    return (
      <div className='react-nav-bar'>
        <ul role='nav' className='nav-links'>
          <li><IndexLink to='/' activeStyle={{color: '#d66853' }}>About</IndexLink></li>
          <li><NavLink to='/request'>Request</NavLink></li>
          <li><NavLink to='/volunteer'>Volunteer</NavLink></li>
          <li><NavLink to='/myteams'>My Teams</NavLink></li>
        </ul>
        <span id='flash'></span>
        {this.props.children}
      </div>
    );
  }
}

export default App;
