import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      this.setState({sites: data.sites})
    })
  }

  render () {
    let no_map_text;
    if(this.state.sites.length != 0){
      no_map_text = null;
      initMap(this.state.sites);
    } else {
      no_map_text = 'There are currently no sites seeking help';
    }
    return (
      <div>
        <h1>Home!</h1>
        <p>{no_map_text}</p>
        <div id='map'></div>
      </div>
    );
  }
}

export default Home;
