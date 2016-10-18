import React from 'react';

const RequestForm = props => {
  return (
    <form onSubmit={props.handleSubmit} id="request-form">
      <div className='small-12 medium-6 large-6 columns'>
        <div className='small-12 medium-6 large-6 columns input-group'>
          <input id="sites-text" className="input-group-field" type="text" name="location" onChange={props.handleChange} placeholder="Full Address"/>
          <input type="text" className="input-group-field" name="contact_name" onChange={props.handleChange} defaultValue={props.user_name}/>
          <input type="text" className="input-group-field" name="contact_phone" onChange={props.handleChange} defaultValue={props.user_phone}/>
          <input type="text" className="input-group-field" name="square_footage" onChange={props.handleChange} placeholder="Square Footage"/>
          <textarea type="textarea" rows="10" cols="20" wrap="hard" className="input-group-field" name="special_details" onChange={props.handleChange} placeholder="Special details..."/>
          <div className="input-group-button">
            <input type="submit" className="button" value="Submit"/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestForm;
