require 'rails_helper'

RSpec.describe Signup, type: :model do
  let(:user1){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:user2){
    User.create(first_name: 'Krystal', last_name: 'Cantos', email: 'kvc@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:site){
    Site.create(user_id: user1.id, location: 'Home', contact_name: user1.full_name, contact_phone: user1.phone_number, square_footage: '1000')
  }

  let(:team){
    Team.create(organizer_id: user2.id, meeting_location: 'Home', meeting_time: 'Now!', site_id: site.id)
  }

  let(:signup){
    Signup.create(team_id: team.id, user_id: user1.id)
  }

  it 'has the expected properties' do
    binding.pry
    expect(signup.user.first_name).to eq('Frank')
    expect(signup.user.last_name).to eq('LaNasa')
    expect(signup.user.email).to eq('fjl@gmail.com')
    expect(signup.user.phone_number).to eq('111-111-1111')
    expect(signup.user.full_name).to eq('Frank LaNasa')
    expect(signup.user.labor).to eq(false)
    expect(signup.user.supplies).to eq(false)
    expect(signup.team.meeting_location).to eq('Home')
  end
end
