import React from 'react';
import PotentialSite from './PotentialSite';

const PotentialSitesList = props => {
  let potentialSites = props.potentialSites.map(site=>{
    return (
      <PotentialSite key={site.id} id={site.id} location={site.location}/>
    )
  })
  return (
    <div>
      <p>Potential Volunteer Sites:</p>
      <ul className="potential-sites">
        {potentialSites}
      </ul>
    </div>
  )
}

export default PotentialSitesList;
