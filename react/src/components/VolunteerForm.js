import React from 'react';

const VolunteerForm = props => {
  let labor = 'I am willing to work on a demolision crew'
  let supplies = 'I am willing to bring supplies for a demolision crew'
  let location_class = 'volunteer-form-row hidden'
  if(props.max_milage != '9999'){
    location_class = 'volunteer-form-row'
  }

  return (
    <div>
      <div className='small-12 medium-3 large-4 columns callout'>
        <form onSubmit={props.handleSubmit} id="volunteer-form">
          <div className='small-12 medium-6 large-6 columns'>
            <div className='volunteer-form-row'>
              <label><input id="labor" type="checkbox" onClick={props.handleLaborClick} name="labor" value="true" defaultChecked={props.labor}/>{labor}</label>
            </div>
            <div className='volunteer-form-row'>
              <label><input id="supplies" type="checkbox" onClick={props.handleSuppliesClick} name="supplies" value="true" defaultChecked={props.supplies}/>{supplies}</label>
            </div>
            <div className='volunteer-form-row'>
              <label htmlFor='max_milage'>How far are you willing to travel?</label>
              <select id='max_milage' defaultValue={props.max_milage} onChange={props.handleSelect}>
                <option value='5'>5 miles</option>
                <option value='10'>10 miles</option>
                <option value='20'>20 miles</option>
                <option value='50'>50 miles</option>
                <option value='100'>100 miles</option>
                <option value='9999'>Send me anywhere</option>
              </select>
            </div>
            <div className={location_class}>
              <label htmlFor="volunteer-loc-text">Where are you coming from?</label>
              <input id="volunteer-loc-text" type="text" name="location"
               onChange={props.handleChange} placeholder="Number, Street, City, etc..." required/>
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
