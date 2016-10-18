import React, {Component} from 'react';
import RequestForm from './RequestForm';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_name: null,
      user_phone: null,
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
    alert('SUBMIT!');
  }

  handleChange(event){
    let nextState={}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  }

  componentDidMount(){
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      this.setState({user: data.user, user_name: `${data.user.first_name} ${data.user.last_name}`, user_phone: data.user.phone_number})
      initMap([]);
    })
  }

  render () {
    let form;
    if(this.state.user != null){
      let user_name = this.state.user_name;
      let user_phone = this.state.user_phone;
      form = <RequestForm handleChange={this.handleChange}
              handleSubmit={this.handleSubmit} user_name={user_name} user_phone={user_phone}/>
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
