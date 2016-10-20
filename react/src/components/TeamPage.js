import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import TeamMemberCollection from './TeamMemberCollection'
import TeamDetails from './TeamDetails'
import TeamUpdateForm from './TeamUpdateForm'

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizer: null,
      user: null,
    }
  }

  render(){
    let details;
    if(this.props.user != null){
      if(this.props.organizer.id == this.props.user.id){
        details = <TeamUpdateForm team={this.props.team} handleChange={this.props.handleChange}
        handleOpenClick={this.props.handleOpenClick} handleBlur={this.props.handleBlur}
        handleTeamUpdate={this.props.handleTeamUpdate} />;
      } else {
        details = <TeamDetails team={this.props.team}/>;
      }
    }

    return(
      <div className='small-12 medium-7 large-8 columns'>
        <p>Organizer: {this.props.organizer.first_name}</p>
        Team members:
        <TeamMemberCollection members={this.props.team_members}/>
        {details}
      </div>
    )
  }
}

export default TeamPage;
