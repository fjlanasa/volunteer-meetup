import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import MyTeamsCollection from './MyTeamsCollection'
import PostCollection from './PostCollection'

class MyTeamsPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: null,
      user_vol_sites: [],
      recent_posts: [],
      status: 'preset'
    }
    this.getState = this.getState.bind(this);
    this.myInterval;
  }

  getState(){
    $.ajax({
      url: '/api/teams',
      contentType: 'application/json'
    })
    .done(data=> {
      this.setState({user: data.user, user_vol_sites: data.user_vol_sites, recent_posts: data.recent_posts, status: ''})
    })
  }

  componentDidMount(){
    this.getState();
    this.myInterval = setInterval(this.getState, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.myInterval);
  }

  render(){
    let myTeams;
    let posts;
    let postsHeader;
    let teamsHeader;
    if(this.state.user != null){
      if(this.state.user_vol_sites.length == 0){
        myTeams = <p>You have not signed up for any teams yet</p>
      } else {
        myTeams = <MyTeamsCollection sites = {this.state.user_vol_sites}/>;
        posts = <PostCollection posts={this.state.recent_posts}/>;
        postsHeader = <h5>Recent posts related to your teams</h5>
        teamsHeader = <h5>Your current teams</h5>
      }
    } else if(this.state.status != 'preset'){
      myTeams = <div>Please <a href='/users/sign_in'>sign in</a> to view your teams</div>;
    }
    return(
      <div>
        <div className='small-12 medium-4 columns'>
          {teamsHeader}
          {myTeams}
        </div>
        <div className='small-12 medium-7 columns my-teams-posts'>
          {postsHeader}
          {posts}
        </div>
      </div>
    )
  }
}

export default MyTeamsPage;
