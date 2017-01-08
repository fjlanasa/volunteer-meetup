import React, {Component} from 'react';
import { hashHistory } from 'react-router'
import VolunteerForm from './VolunteerForm';
import PotentialSitesList from './PotentialSitesList';

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labor: null,
      supplies: 0,
      max_milage: null,
      current_user: 'preset',
      location: null,
      potential_sites: []
    }
    this.handleLaborClick = this.handleLaborClick.bind(this)
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
      if(data.current_user != 'null' && data.current_user != null){
        this.setState({current_user: data.current_user,
                      labor: data.current_user.labor, location: data.current_user.location,
                      supplies: data.current_user.supplies,
                      max_milage: data.current_user.max_milage,
                      potential_sites: data.current_user_potential_sites});
      } else {
        this.setState({current_user: data.current_user, current_volunteer: data.current_volunteer})
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
    if(document.getElementById('volunteer-loc-text')){
      document.getElementById('volunteer-loc-text').blur();
    }
    const volunteerPath = '/volunteer'
    let location = this.state.location;
    if($('#volunteer-form').find("input[name='location']").val() != this.state.location){
      location = $('#volunteer-form').find("input[name='location']").val();
    }
    $.ajax({
      type: "PATCH",
      url: `/api/volunteers/${this.state.current_user.id}`,
      contentType: 'application/json',
      data: JSON.stringify({user: {location: location, labor: this.state.labor,
                                        supplies: this.state.supplies,
                                        max_milage: this.state.max_milage}})
    }).done((data)=>{
      this.getVolInfo();
    })
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
    let noSitesText;
    if(this.state.current_user != 'null' && this.state.current_user != null){
      if(this.state.current_user == 'preset'){
        form =<div>Finding potential sites...</div>
        potentialSites=<span></span>
      } else {
        let labor = this.state.labor;
        let contact_phone = this.state.contact_phone;

        form = <VolunteerForm handleSubmit={this.handleSubmit} labor={this.state.labor}
        supplies={this.state.supplies} max_milage={this.state.max_milage}
        handleSuppliesClick={this.handleSuppliesClick} handleSelect={this.handleSelect}
        handleLaborClick={this.handleLaborClick} location={this.state.location}
        handleChange={this.handleChange}/>;
        if(this.state.potential_sites.length == 0){
          potentialSites = 'There are no potential sites based on your criteria';
        } else {
          potentialSites = <PotentialSitesList potentialSites={this.state.potential_sites}/>;
        }
      }
    } else {
      form = <div className='small-12 columns'>Please <a href='/users/sign_in'>sign in</a> to volunteer</div>;
      potentialSites = <span></span>
    }

    return (
      <div>
        {form}
        <div className='small-12 medium-6 columns'>
          <p>{noSitesText}</p>
          {potentialSites}
        </div>
      </div>
    );
  }
}

export default Volunteer;
