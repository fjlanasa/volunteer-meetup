require 'rails_helper'

describe Api::PostsController, type: :controller do
  feature 'create' do
    scenario 'successfully creates post' do
      user = FactoryGirl.create(:user)
      team = FactoryGirl.create(:team)
      post :create, params: { post: {user_id: user.id, team_id: team.id, body: 'post'} }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq(nil)
    end

    scenario 'unsuccessfully creates post' do
      user = FactoryGirl.create(:user)
      team = FactoryGirl.create(:team)
      post :create, params: { post: {user_id: user.id, team_id: team.id} }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Body can\'t be blank')
    end
  end

  feature 'destroy' do
    scenario 'deletes post' do
      post = FactoryGirl.create(:post)
      delete :destroy, params: { id: post.id }
      res_body = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(res_body['message']).to eq('Your post has been deleted')
    end
  end
end
