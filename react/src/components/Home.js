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
      console.log(data.sites[0].location);
      this.setState({sites: data.sites})
    })
  }

  render () {
    if(this.state.sites.length != 0){
      initMap(this.state.sites);
    }
    return (
      <div>
        <h1>Home!</h1>
        <div id='map'></div>
      </div>
    );
  }
}

export default Home;
