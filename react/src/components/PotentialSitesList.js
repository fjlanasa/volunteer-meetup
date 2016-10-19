import React from 'react';
import PotentialSite from './PotentialSite';

const PotentialSitesList = props => {
  let potentialSites = props.potentialSites.map(site=>{
    return (
      <PotentialSite key={site.id} location={site.location}/>
    )
  })
  return (
    <ul className="potential-sites">
      {potentialSites}
    </ul>
  )
}

export default PotentialSitesList;
