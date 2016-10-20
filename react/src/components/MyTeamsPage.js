import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import MyTeamsCollection from './MyTeamsCollection'

class MyTeamsPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: null,
      user_vol_sites: []
    }
  }

  componentDidMount(){
    $.ajax({
      url: 'api/teams',
      contentType: 'application/json'
    })
    .done(data=> {
      this.setState({user: data.user, user_vol_sites: data.user_vol_sites})
    })
  }

  render(){
    return(
      <div>
        <h1>My Teams!</h1>
        <MyTeamsCollection sites = {this.state.user_vol_sites}/>
      </div>
    )
  }
}

export default MyTeamsPage;
