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
    <div className='small-12 columns'>
      <ul className="potential-sites">
        {sites}
      </ul>
    </div>
  )
}

export default MyTeamsCollection;
