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

  componentDidUpdate() {
    initMap();
  }

  render () {
    return (
      <div>
        <h1>Hey!</h1>
        <ul role='nav'>
          <li><IndexLink to='/' activeStyle={{color: 'red' }}>Home</IndexLink></li>
          <li><NavLink to='/request'>Request</NavLink></li>
          <li><NavLink to='/volunteer'>Volunteer</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
