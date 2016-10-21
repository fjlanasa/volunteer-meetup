import React, {Component} from 'react';
import { hashHistory } from 'react-router';

const VolDetails = props => {
  let working = 'False';
  let supplies;
  if(props.signup != null){
    if(props.signup.labor){
      working = 'True';
    }
    supplies = props.signup.supplies
  }
  return (
    <div>
      <p>Working: {working}</p>
      <p>Supplies sets: {supplies}</p>
    </div>
  );
};

export default VolDetails;
