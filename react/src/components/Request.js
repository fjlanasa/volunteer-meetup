import React, {Component} from 'react';
import { hashHistory } from 'react-router'
import RequestForm from './RequestForm';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      location: null,
      contact_name: null,
      contact_phone: null,
      square_footage: null,
      special_details: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const path = '/'
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
      hashHistory.push(path);
    })
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  componentDidMount(){
    console.log(this.state.user_name)
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      if(data.user != null){
        this.setState({user: data.user, contact_name: `${data.user.first_name} ${data.user.last_name}`, contact_phone: data.user.phone_number})
      }
    })
  }

  componentDidUpdate() {
    initMap([]);
  }

  render () {
    let form;
    if(this.state.user != null){
      let contact_name = this.state.contact_name;
      let contact_phone = this.state.contact_phone;
      form = <RequestForm handleChange={this.handleChange}
              handleSubmit={this.handleSubmit} contact_name={contact_name} contact_phone={contact_phone}/>
    } else {
      form = <div>Please <a href='/users/sign_in'>sign in</a> to make a request for help</div>;
    }
    return (
      <div>
        <h1>Request!</h1>
        {form}
  </div>
    );
  }
}

export default Request;
