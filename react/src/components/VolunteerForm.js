import React from 'react';

const VolunteerForm = props => {
  let labor = 'I am willing to work on a demolision crew'
  let supplies = 'I am willing to bring supplies for a demolision crew'
  return (
    <div>
      <div className='small-12 medium-6 large-6 columns'>
        <form onSubmit={props.handleSubmit} id="volunteer-form">
          <div className='small-12 medium-6 large-6 columns'>
          <div className='volunteer-form-row'>
            <label><input id="labor" type="checkbox" onClick={props.handleClick} name="labor" value="true" defaultChecked={props.labor}/>{labor}</label>
          </div>
          <div className='volunteer-form-row'>
            <label><input id="supplies" type="checkbox" name="supplies" value="true" defaultChecked={props.supplies}/>{supplies}</label>
          </div>
            <div className="input-group-button">
              <input type="submit" className="button" value="Update Volunteer Profile"/>
            </div>
          </div>
        </form>
      </div>
      <div className='small-0 medium-6 large-6'></div>
    </div>
  );
};

export default VolunteerForm;
