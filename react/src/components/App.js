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
      <div>
        <div className='react-nav-bar'>
          <div className='nav-links'>
            <ul role='nav'>
              <li className='nav'><IndexLink to='/' activeStyle={{color: '#d66853' }}>About</IndexLink></li>
              <li className='nav'><NavLink to='/request'>Request</NavLink></li>
              <li className='nav'><NavLink to='/volunteer'>Volunteer</NavLink></li>
              <li><NavLink to='/myteams'>My Teams</NavLink></li>
            </ul>
          </div>
        </div>
        <span id='flash'></span>
        {this.props.children}
      </div>
    );
  }
}

export default App;
