import React from 'react';

const RequestForm = props => {
  return (
    <div className='small-12 medium-5 large-5 columns form-section callout'>
      <form onSubmit={props.handleSubmit} id="request-form">
        <div className='small-12 medium-6 large-6 columns input-group'>
          <label htmlFor="sites-text">Full Address</label>
          <input id="sites-text" type="text" className="input-group-field" name="location"
           onChange={props.handleChange} onBlur={props.handleBlur} value={props.location} required/>

          <label htmlFor="contact_name">Primary Contact</label>
          <input id="contact_name" type="text" className="input-group-field" name="contact_name"
           onChange={props.handleChange} value={props.contact_name} required/>

          <label htmlFor="contact_phone">Contact Phone Number</label>
          <input id="contact_phone" type="text" className="input-group-field" name="contact_phone"
           onChange={props.handleChange} value={props.contact_phone} required/>

          <label htmlFor="square_footage">Square Footage of House</label>
          <input id="square_footage" type="text" className="input-group-field" name="square_footage"
           onChange={props.handleChange} value={props.square_footage} required/>

          <label htmlFor="special_details">Special Details</label>
          <textarea id="special_details" type="textarea" rows="5" cols="20" wrap="hard" className="input-group-field"
           name="special_details" onChange={props.handleChange} value={props.special_details}/>

          <div className="input-group-button">
            <input type="submit" className="button" value="Submit"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
