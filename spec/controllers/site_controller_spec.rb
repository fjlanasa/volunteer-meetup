require 'rails_helper'

describe Api::SitesController, type: :controller do
  it 'should get index' do
    get 'index'
    expect(response.status).to eq(200)
  end

  it 'should get all sites if user not authenticated' do
    sites = FactoryGirl.create_list(:site, 3)
    user = FactoryGirl.create(:user)
    user_site = FactoryGirl.create(:site, user: user)
    get 'index'
    expect(assigns(:sites)).to eq(sites.push(user_site))
    expect(assigns(:user)).to eq(nil)
    expect(assigns(:user_sites)).to eq([])
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
    expect(assigns(:sites)).to eq(sites + user_site)
    expect(assigns(:user)).to  eq(user)
    expect(assigns(:user_sites)).to eq(user_site)
    res_body = JSON.parse(response.body)
  end

  it 'should get show' do
    site = FactoryGirl.create(:site)
    get :show, params: {id: site.id }
    expect(response.status).to eq(200)
  end

  it 'should return return only site info if user not authenticated and site has no team' do
    site = FactoryGirl.create(:site)
    user = FactoryGirl.create(:user)
    get :show, params: {id: site.id }
    res_body = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(res_body['site']).to eq(site.attributes)
    expect(res_body['team']).to eq(nil)
    expect(res_body['user']).to eq(nil)
  end

  it 'should return only site and team info if user not authenticated' do
    organizer = FactoryGirl.create(:user)
    vol = FactoryGirl.create(:user)
    site = FactoryGirl.create(:site)
    team = FactoryGirl.create(:team, site: site, organizer_id: organizer.id)
    post = FactoryGirl.create(:post, team: team, user: vol)
    Signup.create(team: team, user: vol)
    get :show, params: {id: site.id }
    res_body = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(res_body['site']).to eq(site.attributes)
    expect(res_body['team']).to eq(team.attributes)
    expect(res_body['organizer']['id']).to eq(organizer.id)
    expect(res_body['team_members'].length).to eq(2)
    expect(res_body['user']).to eq(nil)
    expect(res_body['creator']['id']).to eq(site.user.id)
    expect(res_body['posts'][0]['body']).to eq(post.body)
  end

  it 'should return site, team, and user info if user authenticated' do
    user = FactoryGirl.create(:user)
    organizer = FactoryGirl.create(:user)
    vol = FactoryGirl.create(:user)
    site = FactoryGirl.create(:site)
    team = FactoryGirl.create(:team, site: site, organizer_id: organizer.id)
    post = FactoryGirl.create(:post, team: team, user: vol)
    Signup.create(team: team, user: vol)
    Signup.create(team: team, user: user)
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
    login_as(user, scope: :user)
    get :show, params: {id: site.id }
    res_body = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(res_body['site']).to eq(site.attributes)
    expect(res_body['team']).to eq(team.attributes)
    expect(res_body['organizer']['id']).to eq(organizer.id)
    expect(res_body['team_members'].length).to eq(3)
    expect(res_body['user']['id']).to eq(user.id)
    expect(res_body['creator']['id']).to eq(site.user.id)
    expect(res_body['posts'][0]['body']).to eq(post.body)
    expect(res_body['user']['id']).to eq(user.id)
    expect(res_body['signup']['user_id']).to eq(user.id)
    expect(res_body['signup']['team_id']).to eq(team.id)
    expect(res_body['member']).to eq(true)
  end
end
