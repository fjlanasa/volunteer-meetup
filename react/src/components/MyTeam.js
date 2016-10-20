import React from 'react';
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'

const MyTeam = props => {
  let path = `/sites/${props.id}`
  return(
    <li className="potential-site">
      <NavLink to={path}>{props.location}</NavLink>
    </li>
  );
};

export default MyTeam;
