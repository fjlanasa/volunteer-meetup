import React, {Component} from 'react';
import { hashHistory } from 'react-router'
import RequestForm from './RequestForm';
import MyRequestCollection from './MyRequestCollection'

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      location: null,
      contact_name: null,
      contact_phone: null,
      square_footage: null,
      special_details: null,
      user_sites: [],
      status: 'preset'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getState = this.getState.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getState(){
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done((data)=> {
      if(data.user != null){
        this.setState({user_sites: data.user_sites, user: data.user,
                      contact_name: `${data.user.first_name} ${data.user.last_name}`,
                      contact_phone: data.user.phone_number, location: '',
                      square_footage: '', special_details: '', status: ''});
      } else {
        this.setState({status: ''})
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    let location = this.state.location;
    if($('#request-form').find("input[name='location']").val() != this.state.location){
      location = $('#request-form').find("input[name='location']").val();
    }
    $.ajax({
      type: "POST",
      url: '/api/sites',
      contentType: 'application/json',
      data: JSON.stringify({site: {location: location, contact_name: this.state.contact_name,
                                    contact_phone: this.state.contact_phone, square_footage: this.state.square_footage,
                                    special_details: this.state.special_details, user_id: this.state.user.id}})
    }).done(()=>{
      this.getState();
    })
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  handleBlur(event){
    this.setState({location: event.target.value})
  }

  componentDidMount(){
    this.getState();
  }

  componentDidUpdate() {
    initMap([]);
  }

  render () {
    let form;
    let myRequests;
    let noRequestsText;
    if(this.state.user != null){
      let contact_name = this.state.contact_name;
      let contact_phone = this.state.contact_phone;
      form = <RequestForm handleChange={this.handleChange}
              handleSubmit={this.handleSubmit} contact_name={contact_name}
              contact_phone={contact_phone} location = {this.state.location}
              square_footage = {this.state.square_footage}
              special_details={this.state.special_details}
              handleBlur={this.handleBlur}/>
      if(this.state.user_sites.length == 0){
        myRequests = 'You have not requested help yet.'
      } else {
        myRequests = <MyRequestCollection requests={this.state.user_sites}/>
      }
    } else if (this.state.status != 'preset'){
      form = <div className='small-12 columns'>Please <a href='/users/sign_in'>sign in</a> to make a request for help</div>;
    }

    return (
      <div>
        {form}
        <div className='small-12 medium-5 large-5 columns'>
          <p>{noRequestsText}</p>
          {myRequests}
        </div>
      </div>
    );
  }
}

export default Request;
