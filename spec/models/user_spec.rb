require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  it 'has the expected properties' do
    expect(user.first_name).to eq('Frank')
    expect(user.last_name).to eq('LaNasa')
    expect(user.email).to eq('fjl@gmail.com')
    expect(user.phone_number).to eq('111-111-1111')
    expect(user.full_name).to eq('Frank LaNasa')
  end
end
