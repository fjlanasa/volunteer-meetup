import React from 'react';
import MyTeam from './MyTeam';

const MyTeamsCollection = props => {
  let sites = props.sites.map(site=>{
    return (
      <MyTeam key={site.id} id={site.id} location={site.location}/>
    )
    debugger;
  })
  return (
    <ul className="potential-sites">
      {sites}
    </ul>
  )
}

export default MyTeamsCollection;
