require 'rails_helper'

RSpec.describe Volunteer, type: :model do
  let(:user){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:volunteer){
    Volunteer.create(user_id: user.id, labor: true, supplies: false)
  }

  it 'has the expected properties' do
    expect(volunteer.first_name).to eq('Frank')
    expect(volunteer.last_name).to eq('LaNasa')
    expect(volunteer.email).to eq('fjl@gmail.com')
    expect(volunteer.phone_number).to eq('111-111-1111')
    expect(volunteer.full_name).to eq('Frank LaNasa')
    expect(volunteer.labor).to eq(true)
    expect(volunteer.supplies).to eq(false)
  end
end
