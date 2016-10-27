require 'rails_helper'

describe Api::VolunteersController, type: :controller, vcr: true do
  let!(:site1) {FactoryGirl.create(:site, location: '11 Villar Road, Gonzales, LA 70737')}
  let!(:site2) {FactoryGirl.create(:site, location: '3300 Corinne Drive, Chalmette, LA 70043')}
  feature 'gets index' do
    scenario 'authenticated user not willing to work or bring supplies and has no location' do
      user = FactoryGirl.create(:user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user']['id']).to eq(user.id)
      expect(res_body['current_user_potential_sites']).to eq([])
      expect(res_body['all_users'].length).to eq(User.all.length)
    end

    scenario 'authenticated user willing to work and will go anywhere' do
      user = FactoryGirl.create(:user, labor: true)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user']['id']).to eq(user.id)
      expect(res_body['current_user_potential_sites'].length).to eq(2)
      expect(res_body['all_users'].length).to eq(User.all.length)
    end

    scenario 'authenticated user only gets potential sites within 10 miles' do
      user = FactoryGirl.create(:user, labor: true, location: '40487 Fox Run Dr, Gonzales, LA 70737',
      max_milage: 10)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user_potential_sites'][0]['id']).to eq(site1.id)
    end

    scenario 'unauthenticated user sees no potential sites' do
      user = FactoryGirl.create(:user, labor: true)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user']).to eq(nil)
      expect(res_body['current_user_potential_sites'].length).to eq(0)
    end

    scenario 'authenticated user doesn\'t see sites they already are team members for' do
      user = FactoryGirl.create(:user, labor: true)
      team = FactoryGirl.create(:team, organizer_id: user.id, site: site1)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user_potential_sites'].length).to eq(1)
      expect(res_body['current_user_potential_sites'][0]['id']).not_to eq(site1.id)
    end

    scenario 'authenticated user doesn\'t see sites they created' do
      user = FactoryGirl.create(:user, labor: true)
      site3 = FactoryGirl.create(:site, location: '11 Villar Road, Gonzales, LA 70737', user: user)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
      login_as(user, scope: :user)
      get 'index'
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['current_user_potential_sites'].length).to eq(2)
      expect(res_body['current_user_potential_sites'][0]['id']).not_to eq(site3.id)
      expect(res_body['current_user_potential_sites'][1]['id']).not_to eq(site3.id)
    end
  end

  feature 'user updates volunteer attributes' do
    scenario 'user successfully updates volunteer attributes' do
      user = FactoryGirl.create(:user)
      patch :update, params: {user: {labor: true }, id: user.id}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully updated your volunteer preferences')
    end
  end
end
