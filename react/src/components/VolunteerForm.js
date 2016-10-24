import React, {Component} from 'react';

class VolunteerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location_class: 'volunteer-form-row hidden'
    }
  }

  componentDidMount(){
    if(this.props.max_milage != '9999'){
      this.setState({location_class: 'volunteer-form-row'})
    } else{
      this.setState({location_class: 'volunteer-form-row hidden'})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.max_milage != '9999'){
      this.setState({location_class: 'volunteer-form-row'})
    } else{
      this.setState({location_class: 'volunteer-form-row hidden'})
    }
  }


  render(){
    let labor = 'I am willing to work on a cleanup crew';
    let supplies = 'I am willing to bring supplies for a cleanup crew';
    let location_input = document.getElementById('volunteer-loc-text');
    if(this.state.location_class == 'volunteer-form-row' && location_input != null){
      location_input.required = true;
    } else if (location_input != null){
      location_input.required = false;
    }
    return (
        <div className='small-12 medium-6 large-4 columns callout'>
          <form onSubmit={this.props.handleSubmit} id="volunteer-form">
            <div className='small-12'>
              <div className='volunteer-form-row'>
                <input id="labor" type="checkbox" onClick={this.props.handleLaborClick} name="labor" value="true" defaultChecked={this.props.labor}/>
                <label htmlFor="labor" className='inline'>{labor}</label>
              </div>

              <div className='volunteer-form-row'>
                <label htmlFor='supplies'>{supplies}</label>
                <input type='number' name='supplies' min='0' onChange={this.props.handleChange} defaultValue={this.props.supplies}/>
              </div>

              <div className='volunteer-form-row'>
                <label htmlFor='max_milage'>How far are you willing to travel?</label>
                <select id='max_milage' defaultValue={this.props.max_milage} onChange={this.props.handleSelect}>
                  <option value='5'>5 miles</option>
                  <option value='10'>10 miles</option>
                  <option value='20'>20 miles</option>
                  <option value='50'>50 miles</option>
                  <option value='100'>100 miles</option>
                  <option value='9999'>Send me anywhere</option>
                </select>
              </div>

              <div className={this.state.location_class}>
                <label htmlFor="volunteer-loc-text">Where are you coming from?</label>
                <input id="volunteer-loc-text" type="text" name="location"
                 onChange={this.props.handleChange} defaultValue={this.props.location}/>
              </div>

              <div className="input-group-button">
                <input type="submit" className="button" value="Search"/>
              </div>
            </div>
          </form>
        </div>
    );
  }
};

export default VolunteerForm;
