require 'rails_helper'

describe Api::SitesController, type: :controller do
  it 'should get index' do
    get 'index'
    json = JSON.parse(response.body)
    response.should be_success
  end

  it 'should get all sites if user not authenticated' do
    sites = FactoryGirl.create_list(:site, 3)
    user = FactoryGirl.create(:user)
    user_site = FactoryGirl.create(:site, user: user)
    get 'index'
    assigns(:sites).should == sites.push(user_site)
    assigns(:user).should == nil
    assigns(:user_sites).should == []
  end

  it 'should return sites and current user if user is authenticated' do
    sites = FactoryGirl.create_list(:site, 5)
    user = FactoryGirl.create(:user)
    user_site = []
    user_site[0] = FactoryGirl.create(:site, user: user)
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
    login_as(user, scope: :user)
    get 'index'
    assigns(:sites).should == sites + user_site
    assigns(:user).should == user
    assigns(:user_sites).should == user_site
  end
end
