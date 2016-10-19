import React from 'react';
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'

const TeamMember = props => {
  return(
    <li className="potential-site">
      {props.first_name}
    </li>
  );
};

export default TeamMember;
