require 'rails_helper'

describe Api::SignupsController, type: :controller do
  feature 'create' do
    scenario 'successfully creates signup' do
      user = FactoryGirl.create(:user)
      team = FactoryGirl.create(:team)
      post :create, params: {signup: {team_id: team.id, user_id: user.id} }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully joined this team!')
    end

    scenario 'unsuccessfully creates signup' do
      team = FactoryGirl.create(:team)
      post :create, params: {signup: {team_id: team.id} }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('User can\'t be blank')
    end
  end

  feature 'update' do
    scenario 'user updates signup attributes' do
      user = FactoryGirl.create(:user)
      team = FactoryGirl.create(:team)
      signup = Signup.create(user_id: user.id, team_id: team.id)
      patch :update, params: {signup: {labor: true}, id: signup.id}
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully updated your volunteer preferences')
    end
  end

  feature 'destroy' do
    scenario 'user deletes signup' do
      user = FactoryGirl.create(:user)
      team = FactoryGirl.create(:team)
      signup = Signup.create(user_id: user.id, team_id: team.id)
      delete :destroy, params: { id: user.id, team_id: team.id }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Successfully left this team')
    end
  end
end
