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
    let button;
    if(this.props.user != null){
      if(this.props.organizer.id == this.props.user.id){
        details = <TeamUpdateForm team={this.props.team} handleChange={this.props.handleChange}
        handleOpenClick={this.props.handleOpenClick} handleBlur={this.props.handleBlur}
        handleTeamUpdate={this.props.handleTeamUpdate} />;
      } else {
        details = <TeamDetails team={this.props.team}/>;
      }
      if(this.props.user.id == this.props.organizer.id){
        button = <button type="button" className="button"
        onClick={this.props.handleDeleteTeamClick}>Delete this Team</button>
      } else if(this.props.member == true) {
        button = <button type="button" className="button"
        onClick={this.props.handleLeaveTeamClick}>Leave this Team</button>
      }
    }

    return(
      <div className='small-12 medium-7 large-8 columns'>
        <h5>Team Info</h5>
        <p>Organizer: {this.props.organizer.first_name}</p>
        Team members:
        <TeamMemberCollection members={this.props.team_members}/>
        {details}
        {button}
      </div>
    )
  }
}

export default TeamPage;
