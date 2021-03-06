import React, {Component} from 'react';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      status: 'preset'
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      this.setState({sites: data.sites, status: ''})
    })
  }

  render () {
    let no_map_text;
    if(this.state.sites.length != 0){
      no_map_text = null;
      initMap(this.state.sites);
    } else if (this.state.status != 'preset'){
      no_map_text = 'There are currently no sites seeking help';
    }
    return (
      <div className='map-page'>
        <div className='wall'>
          <div className='wallText'>
            Volunteer Meetup was created to help people quickly
            and efficiently support victims of flooding
          </div>
        </div>
        <p>Current Help Requests</p>
        <p>{no_map_text}</p>
        <div id='map'></div>
      </div>
    );
  }
}

export default Home;
