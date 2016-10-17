require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:user){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:team){
    Team.create(user_id: user.id, meeting_location: 'Home', meeting_time: 'Now!', workers_needs: 4, supplies_needed: 4)
  }

  it 'has the expected properties' do
    expect(team.user.first_name).to eq('Frank')
    expect(team.meeting_location).to eq('Home')
    expect(team.meeting_time).to eq('Now!')
    expect(team.workers_needs).to eq(4)
    expect(team.supplies_needed).to eq(4)
  end
end
