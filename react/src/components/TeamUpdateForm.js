import React, {Component} from 'react';

class TeamUpdateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div>
        <form id='team-form' onSubmit={this.props.handleTeamUpdate}>
          <div className='small-12'>
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
              <label htmlFor="total_workers">Total Workers</label>
              <input type="number" name="total_workers" min="0" onChange={this.props.handleChange} defaultValue={this.props.team.total_workers}/>
            </div>

            <div className='volunteer-form-row'>
              <label htmlFor='total_supplies'>Total Supplies</label>
              <input type='number' name='total_supplies' min='0' onChange={this.props.handleChange} defaultValue={this.props.team.total_supplies}/>
            </div>

            <div className='volunteer-form-row'>
              <label><input id="open" type="checkbox" onClick={this.props.handleOpenClick}
              name="open" value="true" defaultChecked={this.props.team.open}/>This Team is Open</label>
            </div>

            <div className="input-group-button">
              <input type="submit" className="button" value="Update"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default TeamUpdateForm;
