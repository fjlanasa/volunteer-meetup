import React from 'react';
import Post from './Post';

const PostCollection = props => {
  let posts = props.posts.map(post=>{
    return (
      <Post key={post.id} id={post.id} post={post}
      current_user={props.current_user} deletePost={props.deletePost}/>
    )
  })
  return (
    <div className='small-12 columns post-collection'>
      <ul className="potential-sites">
        {posts}
      </ul>
    </div>
  )
}

export default PostCollection;
