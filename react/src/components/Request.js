import React, {Component} from 'react';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    initMap();
    return (
      <div>
        <h1>Request!</h1>
        <form>
          <div className='small-12 medium-6 large-6 columns'>
            <div className='small-12 medium-6 large-6 columns'>
              <input id="sites-text" type="text" placeholder="Enter your site!"/>
            </div>
            <input id="site" type="button" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Request;
