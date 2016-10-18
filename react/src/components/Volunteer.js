import React, {Component} from 'react';
import VolunteerForm from './VolunteerForm';

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labor: null,
      supplies: null,
      max_distance: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){

  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: '/api/volunteers',
      contentType: 'application/json',
    })
    .done((data)=>{
      this.setState({labor: data.current_volunteer.labor, supplies: data.current_volunteer.supplies});
    })
  }

  handleClick(event){
    alert('clicked!');
  }

  render () {
    return (
      <div>
        <h1>Volunteer!</h1>
        <VolunteerForm handleSubmit={this.handleSubmit} labor={this.state.labor}
        supplies={this.state.supplies} handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default Volunteer;
