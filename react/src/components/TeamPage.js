import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import TeamMemberCollection from './TeamMemberCollection'
import TeamDetails from './TeamDetails'
import TeamUpdateForm from './TeamUpdateForm'
import VolDetails from './VolDetails'
import VolUpdateForm from './VolUpdateForm'

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizer: null,
      user: null,
      update_team_clicked: this.props.team_update_clicked,
      update_vol_clicked: this.props.vol_update_clicked,
      signup: this.props.signup
    }
    this.handleEditTeamClick = this.handleEditTeamClick.bind(this);
    this.handleEditVolClick = this.handleEditVolClick.bind(this);
  }

  handleEditTeamClick(){
    if(this.state.update_team_clicked == true){
      this.setState({update_team_clicked: false})
    } else {
      this.setState({update_team_clicked: true})
    }
  }

  handleEditVolClick(){
    if(this.state.update_vol_clicked == true){
      this.setState({update_vol_clicked: false})
    } else {
      this.setState({update_vol_clicked: true})
    }
  }

  render(){
    let details = <TeamDetails team={this.props.team}/>;
    let delete_button;
    let leave_button;
    let form;
    let edit_team_button = <h5>Team Info</h5>;
    let vol_details;
    let vol_form;
    let edit_vol_button;
    if(this.props.user != null){
      if(this.props.organizer.id == this.props.user.id){
        edit_team_button = <i className="fa fa-pencil-square-o" aria-hidden="true"
        onClick={this.handleEditTeamClick}><h5>Team Info</h5></i>
        if(this.state.update_team_clicked == true){
          form = <TeamUpdateForm team={this.props.team} handleChange={this.props.handleChange}
          handleOpenClick={this.props.handleOpenClick} handleBlur={this.props.handleBlur}
          handleTeamUpdate={this.props.handleTeamUpdate} handleDeleteTeamClick={this.props.handleDeleteTeamClick}/>;
        }
      }
      if(this.props.member == true) {
        edit_vol_button = <i className="fa fa-pencil-square-o" aria-hidden="true"
        onClick={this.handleEditVolClick}><h5>Your Contribution</h5></i>
        vol_details = <VolDetails signup={this.props.signup}/>

        if(this.state.update_vol_clicked == true){
          vol_form = <VolUpdateForm handleEditVolSubmit={this.props.edit_vol}
          handleChange={this.props.handleChange} labor={this.props.labor}
          supplies={this.props.supplies} handleLaborClick={this.props.handleLaborClick}
          handleLeaveTeamClick={this.props.handleLeaveTeamClick} user_id={this.props.user.id}
          organizer_id={this.props.organizer.id}/>
        }
      }
    }

    return(
      <div className='small-12 medium-7 large-8 columns'>
        <div className='small-12 medium-6 columns'>
          {edit_team_button}
          <p>Organizer: {this.props.organizer.first_name}</p>
          Team members:
          <TeamMemberCollection members={this.props.team_members}/>
          {details}
          {form}
          {delete_button}
        </div>
        <div className='small-12 medium-5 columns'>
          {edit_vol_button}
          {vol_details}
          {vol_form}
          {leave_button}
        </div>
      </div>
    )
  }
}

export default TeamPage;
