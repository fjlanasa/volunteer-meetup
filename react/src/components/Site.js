import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import TeamPage from './TeamPage'

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      location: null,
      contact_name: null,
      contact_phone: null,
      square_footage: null,
      special_details: null,
      img_url: '',
      team: null,
      organizer: null,
      team_members: null,
      member: false,
      creator: null,
    }
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getState = this.getState.bind(this);
    this.handleTeamUpdate = this.handleTeamUpdate.bind(this);
    this.handleDeleteTeamClick = this.handleDeleteTeamClick.bind(this);
    this.handleLeaveTeamClick = this.handleLeaveTeamClick.bind(this);
  }
  getState(){
    $.ajax({
      url: `api/sites/${this.props.params.id}`,
      contentType: 'application/json'
    })
    .done(data=>{
      this.setState({current_user: data.user, location: data.site.location,
        contact_name: data.site.contact_name,
        contact_phone: data.site.contact_phone, square_footage: data.site.square_footage,
        special_details: data.site.special_details, team: data.team,
        map_url: data.site.static_map_url, member: data.member,
        team_members: data.team_members, organizer: data.organizer,
        creator: data.creator});
    })
  }

  componentDidMount(){
    this.getState();
  }

  componentDidUpdate() {
    initMap([]);
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  handleOpenClick(){
    if(this.state.team.open == true ){
      let newTeam = this.state.team
      newTeam.open = false
      this.setState({team: newTeam})
    } else {
      let newTeam = this.state.team
      newTeam.open = true
      this.setState({team: newTeam})
    }
  }

  handleBlur(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  handleTeamUpdate(event){
    event.preventDefault();
    $.ajax({
      type: "PATCH",
      url: `api/teams/${this.state.team.id}`,
      contentType: 'application/json',
      data: JSON.stringify({team: {meeting_location: this.state.meeting_location,
                                  meeting_time: this.state.meeting_time,
                                  total_workers: this.state.total_workers,
                                  total_supplies: this.state.total_supplies,
                                  open: this.state.team.open}})
    }).done((data)=>{
      this.getState();
    })
  }


  handleJoinClick(){
    $.ajax({
      type: 'POST',
      url: 'api/signups',
      contentType: 'application/json',
      data: JSON.stringify({signup: {user_id: this.state.current_user.id, team_id: this.state.team.id, site_id: this.props.params.id}})
    })
    .done(data=>{
      this.getState();
    })
  }
  handleCreateClick(){
    $.ajax({
      type: 'POST',
      url: 'api/teams/',
      contentType: 'application/json',
      data: JSON.stringify({team: {organizer_id: this.state.current_user.id, site_id: this.props.params.id}})
    })
    .done(data=> {
      this.getState();
    })
  }

  handleDeleteClick(){
    $.ajax({
      type: 'DELETE',
      url: `api/sites/${this.props.params.id}`,
      contentType: 'application/json'
    })
    .done(()=>{
      hashHistory.push('/');
    })
  }

  handleLeaveTeamClick(){
    $.ajax({
      type: 'DELETE',
      url: `api/signups/${this.state.current_user.id}`,
      contentType: 'application/json',
      data: JSON.stringify({team_id: this.state.team.id})
    })
    .done(()=>{
      hashHistory.push('/');
    })
  }

  handleDeleteTeamClick(){
    $.ajax({
      type: 'DELETE',
      url: `api/teams/${this.state.team.id}`,
      contentType: 'application/json'
    })
    .done(()=>{
      hashHistory.push('/');
    })
  }


  render(){
    let button;
    let teamPage;
    let deleteButton;
    if(this.state.current_user != null){
      if(this.state.team == null){
        button = <button type="button" className="button"
        onClick={this.handleCreateClick}>Create a Team</button>
      } else if(this.state.team != null && this.state.member == false && this.state.team.open){
        button= <button type="button" className="button"
        onClick={this.handleJoinClick}>Join this Team</button>
      }
      if(this.state.current_user.id == this.state.creator.id){
        deleteButton = <button type="button" className="button"
        onClick={this.handleDeleteClick}>Delete this Site</button>
      }
      if(this.state.team != null){
        teamPage = <TeamPage team={this.state.team} user={this.state.current_user}
        organizer={this.state.organizer} member={this.state.member}
        team_members={this.state.team_members} handleChange={this.handleChange}
        handleOpenClick={this.handleOpenClick} handleBlur={this.handleBlur}
        handleTeamUpdate={this.handleTeamUpdate}
        handleDeleteTeamClick={this.handleDeleteTeamClick}
        handleLeaveTeamClick={this.handleLeaveTeamClick}/>
      }
    }
    return(
      <div>
        <div className='small-12 medium-4 large-3 columns'>
          <h5>Site Info</h5>
          <ul>
            <li>Location: {this.state.location}</li>
            <li>Contact Name: {this.state.contact_name}</li>
            <li>Contact Phone Number:{this.state.contact_phone}</li>
            <li>Square Footage: {this.state.square_footage}</li>
            <li>Special Details: {this.state.special_details}</li>
          </ul>
          <img src={this.state.map_url}/>
          {button}
          {deleteButton}
        </div>
        {teamPage}
      </div>
    )
  }
}

export default Site;
