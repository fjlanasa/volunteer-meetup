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
    <ul className="potential-sites">
      {requests}
    </ul>
  )
}

export default MyRequestCollection;
