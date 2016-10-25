import React, {Component} from 'react';
import { hashHistory } from 'react-router';

const TeamDetails = props => {
  return (
    <div>
      <p>Total Workers: {props.team.total_workers}</p>
      <p>Total Supplies: {props.team.total_supplies}</p>
      <p>Meeting Location: {props.team.meeting_location}</p>
      <p>Meeting Date: {props.team.meeting_date}</p>
      <p>Meeting Time: {props.team.meeting_time}</p>
    </div>
  );
};

export default TeamDetails
