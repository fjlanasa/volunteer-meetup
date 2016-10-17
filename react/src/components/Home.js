import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
    }
    this.getSites = this.getSites.bind(this)
  }

  getSites() {
    $.ajax({
      url: '/api/sites',
      contentType: 'application/json'
    })
    .done(data=> {
      console.log(data.sites[0].location);
      this.setState({sites: data.sites})
    })
  }

  componentDidMount() {

  }

  render () {

    return (
      <div>
        <h1>Home!</h1>
        <div id='map'></div>
      </div>
    );
  }
}

export default Home;
