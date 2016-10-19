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
    let no_map_text = <span>There are currently no sites seeking help</span>
    if(this.state.sites.length != 0){
      no_map_text = <span></span>
      initMap(this.state.sites);
    }
    return (
      <div>
        <h1>Home!</h1>
        {no_map_text}
        <div id='map'></div>
      </div>
    );
  }
}

export default Home;
