import React from 'react';
import MyRequest from './MyRequest';

const MyRequestCollection = props => {
  let requests = props.requests.map(request=>{
    return (
      <MyRequest key={request.id} id={request.id} location={request.location}/>
    )
    debugger;
  })
  return (
    <div>
      <p>My Requests:</p>
      <ul className="potential-sites">
        {requests}
      </ul>
    </div>
  )
}

export default MyRequestCollection;
