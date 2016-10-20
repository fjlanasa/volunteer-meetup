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
      creator: null
    }
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getState = this.getState.bind(this);
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
                    creator: data.creator})
    })
  }

  handleJoinClick(){
    $.ajax({
      type: 'POST',
      url: 'api/signups',
      contentType: 'application/json',
      data: JSON.stringify({signup: {user_id: this.state.current_user.id, team_id: this.state.team.id}})
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
      data: JSON.stringify({team: {organizer_id: this.state.current_user.id}, site_id: this.props.params.id})
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

  componentDidMount(){
    this.getState();
  }

  render(){
    let button;
    let teamPage;
    let deleteButton;
    if(this.state.current_user != null){
      if(this.state.team == null && this.state.current_user.id != this.state.creator.id){
        button = <button type="button" className="button"
        onClick={this.handleCreateClick}>Create a Team</button>
      } else if(this.state.team != null && this.state.member == false && this.state.team.open){
        button= <button type="button" className="button"
        onClick={this.handleJoinClick}>Join this Team</button>
      }
      if(this.state.current_user.id == this.state.creator.id){
        deleteButton = <button type="button" className="button"
        onClick={this.handleDeleteClick}>Close this Site</button>
      }
    }
    if(this.state.team != null){
      teamPage = <TeamPage team={this.state.team} user={this.state.user}
                  organizer={this.state.organizer}
                  team_members={this.state.team_members}/>
    }
    return(
      <div>
        <div className='small-12 medium-4 large-3 columns'>
          <ul>
            <li>{this.state.location}</li>
            <li>{this.state.contact_name}</li>
            <li>{this.state.contact_phone}</li>
            <li>{this.state.square_footage}</li>
            <li>{this.state.special_details}</li>
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
