import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import TeamPage from './TeamPage'
import PostCollection from './PostCollection'
import PostForm from './PostForm'

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
      team_update_clicked: false,
      vol_update_clicked: false,
      signup: null,
      labor: null,
      supplies: null,
      posts: [],
      post_text: ''
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
    this.handleEditVolSubmit = this.handleEditVolSubmit.bind(this);
    this.handleLaborClick = this.handleLaborClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  getState(){
    $.ajax({
      url: `/api/sites/${this.props.params.id}`,
      contentType: 'application/json'
    })
    .done(data=>{
      if(data.site !== null){
        let labor;
        let supplies;
        if(data.signup !== null){
          labor = data.signup.labor;
          supplies = data.signup.supplies;
        }
        this.setState({current_user: data.user, location: data.site.location,
          contact_name: data.site.contact_name, contact_phone: data.site.contact_phone,
          square_footage: data.site.square_footage, special_details: data.site.special_details,
          team: data.team, map_url: data.site.static_map_url, member: data.member,
          team_members: data.team_members, organizer: data.organizer, creator: data.creator,
          signup: data.signup, labor: labor, supplies: supplies, posts: data.posts,
          post_text: ''});
      }
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

  deletePost(event){
    event.preventDefault();
    let postId = event.target.elements['postId'].value;
    $.ajax({
      type: 'DELETE',
      url: `/api/posts/${postId}`,
      contentType: 'application/json'
    })
    .done((data)=>{
      this.getState();
    })
  }

  handleFormSubmit(event){
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      contentType: 'application/json',
      data: JSON.stringify({post: {user_id: this.state.current_user.id,
        team_id: this.state.team.id, body: this.state.post_text}})
    })
    .done((data)=>{
      this.getState();
    })
  }

  handleLaborClick(event){
    if(this.state.labor === true){
      this.setState({labor: false})
    } else {
      this.setState({labor: true})
    }
  }

  handleEditVolSubmit(event){
    event.preventDefault();
    $.ajax({
      type: "PATCH",
      url: `/api/signups/${this.state.signup.id}`,
      contentType: 'application/json',
      data: JSON.stringify({signup: {labor: this.state.labor,
            supplies: this.state.supplies}})
    }).done((data)=>{
      this.getState();
    })
  }

  handleOpenClick(){
    if(this.state.team.open === true ){
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
    debugger;
    $.ajax({
      type: "PATCH",
      url: `/api/teams/${this.state.team.id}`,
      contentType: 'application/json',
      data: JSON.stringify({team: {meeting_location: this.state.meeting_location,
            meeting_date: this.state.meeting_date, meeting_time: this.state.meeting_time,
            open: this.state.team.open}})
    }).done((data)=>{
      this.getState();
    })
  }


  handleJoinClick(){
    $.ajax({
      type: 'POST',
      url: '/api/signups',
      contentType: 'application/json',
      data: JSON.stringify({signup: {user_id: this.state.current_user.id,
        team_id: this.state.team.id, site_id: this.props.params.id,
        labor: this.state.current_user.labor, supplies: this.state.current_user.supplies}})
    })
    .done((data)=>{
      this.getState();
    })
  }
  handleCreateClick(){
    $.ajax({
      type: 'POST',
      url: '/api/teams/',
      contentType: 'application/json',
      data: JSON.stringify({team: {organizer_id: this.state.current_user.id,
        site_id: this.props.params.id}, labor: this.state.current_user.labor,
        supplies: this.state.current_user.supplies})
    })
    .done((data)=> {
      this.getState();
    })
  }

  handleDeleteClick(){
    $.ajax({
      type: 'DELETE',
      url: `/api/sites/${this.props.params.id}`,
      contentType: 'application/json'
    })
    .done(()=>{
      browserHistory.push('/');
    })
  }

  handleLeaveTeamClick(){
    $.ajax({
      type: 'DELETE',
      url: `/api/signups/${this.state.current_user.id}`,
      contentType: 'application/json',
      data: JSON.stringify({team_id: this.state.team.id})
    })
    .done(()=>{
      this.getState();
    })
  }

  handleDeleteTeamClick(){
    $.ajax({
      type: 'DELETE',
      url: `/api/teams/${this.state.team.id}`,
      contentType: 'application/json'
    })
    .done(()=>{
      this.getState();
    })
  }


  render(){
    let button;
    let teamPage;
    let deleteButton;
    let postCollection;
    let postForm;
    if(this.state.current_user !== null){
      if(this.state.current_user.id == this.state.creator.id){
        deleteButton = <div className='input-group-button'><button type="button"
        className="destroy button"onClick={this.handleDeleteClick}>Delete Site</button></div>
      }

      if(this.state.team === null){
        button = <div className='input-group-button'><button type="button"
        className="create button" onClick={this.handleCreateClick}>Create Team</button></div>
      } else if(this.state.team !== null && this.state.member === false && this.state.team.open){
        button= <div className='input-group-button'><button type="button"
        className="create button" onClick={this.handleJoinClick}>Join Team</button></div>
      }

      if(this.state.team !== null){
        teamPage = <TeamPage team={this.state.team} user={this.state.current_user}
        organizer={this.state.organizer} member={this.state.member}
        team_members={this.state.team_members} handleChange={this.handleChange}
        handleOpenClick={this.handleOpenClick} handleBlur={this.handleBlur}
        handleTeamUpdate={this.handleTeamUpdate} signup={this.state.signup}
        handleDeleteTeamClick={this.handleDeleteTeamClick}
        handleLeaveTeamClick={this.handleLeaveTeamClick}
        team_update_clicked={this.state.team_update_clicked}
        vol_update_clicked={this.state.vol_update_clicked}
        edit_vol={this.handleEditVolSubmit}
        handleLaborClick={this.handleLaborClick}
        handleEditVolSubmit={this.handleEditVolSubmit}
        labor={this.state.labor} supplies={this.state.supplies}/>

        if(this.state.member === true || this.state.current_user.id === this.state.creator.id){
          postCollection = <PostCollection posts={this.state.posts} deletePost={this.deletePost}
          current_user={this.state.current_user}/>;
          postForm = <PostForm onChange={this.handleChange} current_user={this.state.current_user}
          post_text={this.state.post_text} onSubmit={this.handleFormSubmit}/>
        }
      }
    }
    return(
      <div>
        <div className='small-12 medium-4 large-3 columns'>
          <div className='small-12 columns'>
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
        </div>
        {teamPage}
        <div className='small-12 columns post-section'>
          {postForm}
          {postCollection}
        </div>
      </div>
    )
  }
}

export default Site;
