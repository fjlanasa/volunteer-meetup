import React from 'react';
import { Link, IndexLink } from 'react-router'


const Post = props => {
  let path = `/sites/${props.post.team_site.id}`
  let deleteButton;
  if(props.current_user != null && props.current_user.id == props.post.user_id){
    deleteButton = <form className='post-delete-form' onSubmit={props.deletePost}>
                    <input type='hidden' name='postId' value={props.post.id}/>
                    <input type='submit' className='button input-group destroy' value='Delete'/>
                  </form>
  }
  return(
    <li className="potential-site">
      <div className='callout small-12 columns post'>
        <ul>
          <li>User: {props.post.user_name}</li>
          <li>Site: <Link to={path}>{props.post.team_site.location}</Link></li>
          <li>{props.post.updated_at}</li>
        </ul>
        <p className='post-body'>{props.post.body}</p>
        {deleteButton}
      </div>
    </li>
  );
};

export default Post;
