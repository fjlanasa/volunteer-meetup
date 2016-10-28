import Post from 'components/Post';
import React from 'react';
import { Link, IndexLink } from 'react-router'

describe('Post', () => {
  let post = {id: '1',
  team_id:'1',
  user_id:'1',
  created_at: 'Wed, 26 Oct 2016 19:18:50 UTC +00:00',
  updated_at: 'Wed, 26 Oct 2016 19:18:50 UTC +00:00',
  user_name:'Frank LaNasa',
  team_site:{
    id:'12',
    location:'40487 Fox Run Drive',
    contact_name: 'Frank LaNasa',
    contact_phone: '2000',
    user_id: '2',
    lat: '30.098',
    lng: '-91.000',
    static_map_url: 'google.com'
  }}

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Post
        post = {post}
      />
    );
  });

  it('should render a div', () => {
    expect(wrapper.find('div')).toBePresent();
  });

  it('should render 4 li tags', ()=>{
    expect(wrapper.find('li').length).toEqual(4);
  })

  it('should render an li with user name as text', ()=>{
    expect(wrapper.find('li').at(1)).toHaveText('User: Frank LaNasa');
  })

  it('should render an li with link to site page', ()=> {
    expect(wrapper.find('li').at(2)).toHaveReact('<Link />');
  })
})
