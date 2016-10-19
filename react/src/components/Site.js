import React, {Component} from 'react';
import { hashHistory } from 'react-router';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      current_volunteer: null,
      location: null,
      contact_name: null,
      contact_phone: null,
      square_footage: null,
      special_details: null,
      img_url: '',
      team: null,
      member: false
    }
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
  }

  handleJoinClick(){
    $.ajax({
      type: 'POST',
      url: 'api/signups',
      contentType: 'application/json',
      data: JSON.stringify({signup: {volunteer_id: this.state.current_volunteer.id, team_id: this.state.team.id}})
    })
    .done(data=>{
      alert(data.message)
      this.setState({member: true})
    })
  }
  handleCreateClick(){
    $.ajax({
      type: 'POST',
      url: 'api/teams/',
      contentType: 'application/json',
      data: JSON.stringify({team: {user_id: this.state.current_user.id}, site_id: this.props.params.id})
    })
    .done(data=> {
      this.setState({team: data.team, member: true});
    })
  }

  componentDidMount(){
    $.ajax({
      url: `api/sites/${this.props.params.id}`,
      contentType: 'application/json'
    })
    .done(data=>{
      this.setState({current_user: data.user, current_volunteer: data.volunteer,
                    location: data.site.location, contact_name: data.site.contact_name,
                    contact_phone: data.site.contact_phone, square_footage: data.site.square_footage,
                    special_details: data.site.special_details, team: data.team,
                    map_url: data.site.static_map_url, member: data.member})
    })
  }

  render(){
    let button;
    if(this.state.current_user != null){
      if(this.state.team == null){
        button = <button type="button" className="button"
        onClick={this.handleCreateClick}>Create a Team</button>
      } else if(this.state.team != null && this.state.member == false && this.state.team.open){
        button= <button type="button" className="button"
        onClick={this.handleJoinClick}>Join this Team</button>
      }
    }
    return(
      <div>
        <ul>
          <li>{this.state.location}</li>
          <li>{this.state.contact_name}</li>
          <li>{this.state.contact_phone}</li>
          <li>{this.state.square_footage}</li>
          <li>{this.state.special_details}</li>
        </ul>
        <img src={this.state.map_url}/>
        {button}
      </div>
    )
  }
}

export default Site;
