import React from 'react';
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'

const TeamMember = props => {
  return(
    <li className="potential-site">
      {props.member.first_name} {props.member.last_name} ({props.member.phone_number})
    </li>
  );
};

export default TeamMember;
