import React, {Component} from 'react';

class VolUpdateForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    console.log(this.props.supplies);
    let labor = 'I am willing to work on a cleanup crew';
    let supplies = 'I am willing to bring supplies for a cleanup crew';
    let leave_button;
    if(this.props.user_id != this.props.organizer_id){
      leave_button = <div className="input-group-button">
                        <button type="button" className="destroy button"
                        onClick={this.props.handleLeaveTeamClick}>
                          Leave Team
                        </button>
                      </div>
    }
    return(
      <div className='small-12 callout form-section input-group'>
        <form onSubmit={this.props.handleEditVolSubmit} id="volunteer-form">
          <div className='small-12'>
            <div className='volunteer-form-row'>
              <label><input id="labor" type="checkbox" onClick={this.props.handleLaborClick} name="labor" value="true" defaultChecked={this.props.labor}/>{labor}</label>
            </div>

            <div className='volunteer-form-row'>
              <label htmlFor='supplies'>{supplies}</label>
              <input type='number' name='supplies' min='0' onChange={this.props.handleChange} defaultValue={this.props.supplies}/>
            </div>

            <div className="input-group-button">
              <input type="submit" className="button" value="Update"/>
            </div>

            {leave_button}
          </div>
        </form>
      </div>
    )
  }
}

export default VolUpdateForm;
