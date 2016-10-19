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
      user_sites: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }

  getInitialState(){
    debugger;
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      if(data.user != null){
        this.setState({user_sites: data.user_sites, user: data.user,
                      contact_name: `${data.user.first_name} ${data.user.last_name}`
                      , contact_phone: data.user.phone_number, location: null,
                      square_footage: null, special_details: null})
      }
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const indexPath = '/'
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
    }).done((data)=>{
      this.getInitialState();
    })
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  componentDidMount(){
    this.getInitialState();
  }

  componentDidUpdate() {
    initMap([]);
  }

  render () {
    debugger;
    let form;
    let myRequests;
    if(this.state.user != null){
      let contact_name = this.state.contact_name;
      let contact_phone = this.state.contact_phone;
      form = <RequestForm handleChange={this.handleChange}
              handleSubmit={this.handleSubmit} contact_name={contact_name} contact_phone={contact_phone}/>
      myRequests = <MyRequestCollection requests={this.state.user_sites}/>
    } else {
      form = <div>Please <a href='/users/sign_in'>sign in</a> to make a request for help</div>;
    }
    return (
      <div>
        <h1>Request!</h1>
        {form}
        <div className='small-12 medium-5 large-5 columns'>
          {myRequests}
        </div>
      </div>
    );
  }
}

export default Request;
