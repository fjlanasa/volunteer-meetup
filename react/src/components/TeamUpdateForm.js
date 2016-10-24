import React, {Component} from 'react';

class TeamUpdateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div className='small-12 columns callout form-section'>
        <h5>Update team info</h5>
        <form id='team-form' onSubmit={this.props.handleTeamUpdate}>
          <div>
            <div className='volunteer-form-row'>
              <label htmlFor="team-loc-text">Meeting Location</label>
              <input id="team-loc-text" type="text" name="meeting_location" onBlur={this.props.handleBlur}
              onChange={this.props.handleChange} defaultValue={this.props.team.meeting_location}/>
            </div>

            <div className='volunteer-form-row'>
              <label htmlFor="meeting_time">Meeting Time</label>
              <input id="meeting_time" type="text" className="input-group-field" name="meeting_time"
              onChange={this.props.handleChange} defaultValue={this.props.team.meeting_time} />
            </div>

            <div className='volunteer-form-row'>
              <label><input id="open" type="checkbox" onClick={this.props.handleOpenClick}
              name="open" value="true" defaultChecked={this.props.team.open}/>This Team is Open</label>
            </div>

            <div className="input-group-button">
              <input type="submit" className="button" value="Update"/>
            </div>

            <div className="input-group-button">
              <button type="button" className="destroy button" onClick={this.props.handleDeleteTeamClick}>
                Delete Team
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default TeamUpdateForm;
