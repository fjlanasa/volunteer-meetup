import React, { Component } from 'react'
import { Link } from 'react-router'

class NavLink extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Link {...this.props} activeStyle={{ color: '#d66853' }}/>
    )
  }
}

export default NavLink;
