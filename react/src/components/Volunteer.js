import React, {Component} from 'react';
import { hashHistory } from 'react-router'
import VolunteerForm from './VolunteerForm';
import PotentialSitesList from './PotentialSitesList';

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labor: null,
      supplies: null,
      max_milage: null,
      current_user: 'preset',
      location: null,
      current_volunteer: null,
      potential_sites: []
    }
    this.handleLaborClick = this.handleLaborClick.bind(this)
    this.handleSuppliesClick = this.handleSuppliesClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getVolInfo = this.getVolInfo.bind(this)
  }

  getVolInfo() {
    $.ajax({
      type: "GET",
      url: '/api/volunteers',
      contentType: 'application/json',
    })
    .done((data)=>{
      if(data.current_volunteer != null){
        this.setState({current_user: data.current_user, current_volunteer: data.current_volunteer,
                      labor: data.current_volunteer.labor, location: data.current_volunteer.location,
                      supplies: data.current_volunteer.supplies,
                      max_milage: data.current_volunteer.max_milage,
                      potential_sites: data.current_volunteer_potential_sites});
      }
    })
  }

  handleSelect(event){
    let max_milage = event.target.value;
    this.setState({max_milage: max_milage})
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  handleSubmit(event){
    event.preventDefault();
    const volunteerPath = '/volunteer'
    let location = this.state.location;
    if($('#volunteer-form').find("input[name='location']").val() != this.state.location){
      location = $('#volunteer-form').find("input[name='location']").val();
    }
    $.ajax({
      type: "PATCH",
      url: `api/volunteers/${this.state.current_volunteer.id}`,
      contentType: 'application/json',
      data: JSON.stringify({volunteer: {location: location, labor: this.state.labor,
                                        supplies: this.state.supplies,
                                        max_milage: this.state.max_milage}})
    }).done((data)=>{
      this.getVolInfo();
    })
  }

  handleSuppliesClick(event){
    this.setState({supplies: !this.state.supplies})
  }

  handleLaborClick(event){
    if(this.state.labor == true ){
      this.setState({labor: false})
    } else {
      this.setState({labor: true})
    }
  }

  componentDidMount() {
    this.getVolInfo();
  }

  componentDidUpdate() {
    console.log('updated');
    initMap([]);
  }

  render () {
    let form;
    let potentialSites;
    if(this.state.current_user != null){
      if(this.state.current_user == 'preset'){
        form =<div>Finding potential sites...</div>
        potentialSites=<span></span>
      } else {
        let labor = this.state.labor;
        let contact_phone = this.state.contact_phone;
        form = <VolunteerForm handleSubmit={this.handleSubmit} labor={this.state.labor}
        supplies={this.state.supplies} max_milage={this.state.max_milage}
        handleSuppliesClick={this.handleSuppliesClick} handleSelect={this.handleSelect}
        handleLaborClick={this.handleLaborClick} location={this.state.location}/>;
        potentialSites = <PotentialSitesList potentialSites={this.state.potential_sites}/>;
      }
    } else {
      form = <div>Please <a href='/users/sign_in'>sign in</a> to volunteer</div>;
      potentialSites = <span></span>
    }


    return (
      <div>
        <h1>Volunteer!</h1>
        {form}
        <div className='small-12 medium-6 columns'>
          {potentialSites}
        </div>
      </div>
    );
  }
}

export default Volunteer;
