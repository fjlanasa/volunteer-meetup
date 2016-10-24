import React from 'react';

const PostForm = props => {
  return(
    <div className='small-12 columns'>
      <div className='small 12 columns callout'>
        <form onSubmit={props.onSubmit} id='post-form'>
          <div className='input group'>
            <label htmlFor="post-text">Leave a Post</label>
            <textarea id="post-text" type="textarea" rows="3" cols="20" wrap="hard"
             className="input-group-field" name="post_text" onChange={props.onChange}
             value={props.post_text}/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostForm;
