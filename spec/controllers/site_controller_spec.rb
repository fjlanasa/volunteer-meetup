require 'rails_helper'

describe Api::SitesController, type: :controller, vcr: true do
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

  it 'should create site when supplies correct params' do
    user = FactoryGirl.create(:user)
    post :create, params: {site: {user_id: user.id,
      location: "40487 Fox Run Drive, Gonzales, LA, United States", contact_name: user.full_name,
    contact_phone: user.phone_number, square_footage: '4000'}}
    expect(response.status).to eq(201)
    expect(Site.all.length).to eq(1)
    expect(Site.first.lat).to eq(30.285043)
    expect(Site.first.lng).to eq(-90.923277)
  end

  it 'should not create lat/lng for site with nonidentifiable address' do
    user = FactoryGirl.create(:user)
    post :create, params: {site: {user_id: user.id,
      location: "alskdjfasidfa", contact_name: user.full_name,
    contact_phone: user.phone_number, square_footage: '4000'}}
    expect(response.status).to eq(201)
    expect(Site.all.length).to eq(1)
    expect(Site.first.lat).to eq(nil)
  end

  it 'should not create site when supplied with incorrect params' do
    user = FactoryGirl.create(:user)
    sites = Site.all
    post :create, params: {site: {user_id: user.id, location: '', contact_name: user.full_name,
    contact_phone: user.phone_number, square_footage: '4000'}}
    res_body = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(Site.all.length).to eq(sites.length)
    expect(res_body['message']).to eq('Location can\'t be blank')
  end

  it 'should delete site' do
    site = FactoryGirl.create(:site)
    delete :destroy, params: { id: site.id }
    res_body = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(res_body['message']).to eq('Successfully deleted your request')
  end
end
