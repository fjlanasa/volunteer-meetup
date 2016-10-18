import React, {Component} from 'react';
import VolunteerForm from './VolunteerForm';

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labor: null,
      supplies: null,
      max_milage: null,
      current_user: null
    }
    this.handleLaborClick = this.handleLaborClick.bind(this)
    this.handleSuppliesClick = this.handleSuppliesClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event){
    let max_milage = event.target.value;
    this.setState({max_milage: max_milage})
  }

  handleSubmit(){

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
    $.ajax({
      type: "GET",
      url: '/api/volunteers',
      contentType: 'application/json',
    })
    .done((data)=>{
      if(data.current_volunteer != null){
        this.setState({current_user: data.current_user, labor: data.current_volunteer.labor,
                                    supplies: data.current_volunteer.supplies,
                                    max_milage: data.current_volunteer.max_milage});
      }
    })
  }

  componentDidUpdate() {
    console.log('updated');
    initMap([]);
  }

  render () {
    let form;
    if(this.state.current_user != null){
      let labor = this.state.labor;
      let contact_phone = this.state.contact_phone;
      form = <VolunteerForm handleSubmit={this.handleSubmit} labor={this.state.labor}
              supplies={this.state.supplies} max_milage={this.state.max_milage}
              handleSuppliesClick={this.handleSuppliesClick} handleSelect={this.handleSelect}
              handleLaborClick={this.handleLaborClick}/>;
    } else {
      form = <div>Please <a href='/users/sign_in'>sign in</a> to volunteer</div>;
    }


    return (
      <div>
        <h1>Volunteer!</h1>
        {form}
      </div>
    );
  }
}

export default Volunteer;
