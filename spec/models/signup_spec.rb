require 'rails_helper'

RSpec.describe Signup, type: :model do
  let(:user1){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:user2){
    User.create(first_name: 'Krystal', last_name: 'Cantos', email: 'kvc@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:volunteer){
    Volunteer.create(user_id: user1.id, labor: true, supplies: false)
  }

  let(:team){
    Team.create(user_id: user2.id, meeting_location: 'Home', meeting_time: 'Now!', workers_needs: 4, supplies_needed: 4)
  }

  let(:signup){
    Signup.create(team_id: team.id, volunteer_id: volunteer.id)
  }

  it 'has the expected properties' do
    expect(signup.volunteer.first_name).to eq('Frank')
    expect(signup.volunteer.last_name).to eq('LaNasa')
    expect(signup.volunteer.email).to eq('fjl@gmail.com')
    expect(signup.volunteer.phone_number).to eq('111-111-1111')
    expect(signup.volunteer.full_name).to eq('Frank LaNasa')
    expect(signup.volunteer.labor).to eq(true)
    expect(signup.volunteer.supplies).to eq(false)
    expect(signup.team.meeting_location).to eq('Home')
  end
end
