require 'rails_helper'

describe Api::TeamsController, type: :controller do
  feature 'user visits index page' do
    scenario 'should get index' do
      get 'index'
      expect(response.status).to eq(200)
    end

    scenario 'should not return user\'s teams\'s posts if user is not authenticated' do
      user = FactoryGirl.create(:user)
      team1 = FactoryGirl.create(:team, organizer_id: user.id)
      team2 = FactoryGirl.create(:team, organizer_id: FactoryGirl.create(:user).id)
      Signup.create(team: team2, user: user)
      post1 = FactoryGirl.create(:post, team: team1, user: user)
      post2 = FactoryGirl.create(:post, team: team2, user: user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(res_body['user']).to eq(nil)
      expect(res_body['user_vol_sites']).to eq([])
      expect(res_body['recent_posts']).to eq([])
      expect(response.status).to eq(200)
    end

    scenario 'should return user\'s teams\'s posts if user is not authenticated' do
      user = FactoryGirl.create(:user)
      team1 = FactoryGirl.create(:team, organizer_id: user.id)
      team2 = FactoryGirl.create(:team, organizer_id: FactoryGirl.create(:user).id)
      Signup.create(team: team2, user: user)
      post1 = FactoryGirl.create(:post, team: team1, user: user)
      post2 = FactoryGirl.create(:post, team: team2, user: user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(res_body['user']['id']).to eq(user.id)
      expect(res_body['user_vol_sites'].length).to eq(2)
      expect(res_body['recent_posts'].length).to eq(2)
      expect(response.status).to eq(200)
    end
  end

  feature 'user creates new team' do
    scenario 'should create new team if supplied correct params' do
      user = FactoryGirl.create(:user)
      site = FactoryGirl.create(:site)
      post :create, params: {team: {organizer_id: user.id, site_id: site.id}}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully created a new team!')
      expect(Team.all.length).to eq(1)
    end

    scenario 'user does not provide correct params' do
      user = FactoryGirl.create(:user)
      site = FactoryGirl.create(:site)
      post :create, params: {team: {organizer_id: user.id}}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Site must exist')
      expect(Team.all.length).to eq(0)
    end
  end

  feature 'user edits team' do
    scenario 'user successfully edits team attributes' do
      team = FactoryGirl.create(:team)
      patch :update, params: {team: {meeting_location: 'My house'}, id: team.id}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully updated your team!')
    end

    scenario 'user unsuccessfully edits team attributes by removing required field' do
      team = FactoryGirl.create(:team)
      patch :update, params: {team: {meeting_location: 'My house', site_id: ''}, id: team.id}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Site must exist')
    end
  end
end
