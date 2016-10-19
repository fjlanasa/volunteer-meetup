import React from 'react';
import TeamMember from './TeamMember';

const TeamMemberCollection = props => {
  let members = props.members.map(member=>{
    return (
      <TeamMember key={member.id} id={member.id} first_name={member.first_name}/>
    )
    debugger;
  })
  return (
    <ul className="potential-sites">
      {members}
    </ul>
  )
}

export default TeamMemberCollection;
