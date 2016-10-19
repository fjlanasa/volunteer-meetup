import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import TeamMemberCollection from './TeamMemberCollection'

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div className='small-12 medium-7 large-8 columns'>
        <p>Organizer: {this.props.organizer.first_name}</p>
        Team members:
        <TeamMemberCollection members={this.props.team_members}/>
      </div>
    )
  }
}

export default TeamPage;
