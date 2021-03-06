require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:user){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:team){
    Team.create(organizer_id: user.id, meeting_location: 'Home', meeting_time: 'Now!')
  }

  it 'has the expected properties' do
    expect(team.organizer_id).to eq(user.id)
    expect(team.meeting_location).to eq('Home')
    expect(team.meeting_time).to eq('Now!')
  end
end
