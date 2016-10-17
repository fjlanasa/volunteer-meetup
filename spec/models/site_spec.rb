require 'rails_helper'

RSpec.describe Site, type: :model do
  let(:user){
    User.create(first_name: 'Frank', last_name: 'LaNasa', email: 'fjl@gmail.com', password: 'password', phone_number: '111-111-1111')
  }

  let(:site){
    Site.create(user_id: user.id, location: 'Home', contact_name: user.full_name, contact_phone: user.phone_number, square_footage: '1000')
  }

  it 'has the expected properties' do
    expect(site.contact_name).to eq('Frank LaNasa')
    expect(site.location).to eq('Home')
    expect(site.contact_phone).to eq('111-111-1111')
    expect(site.square_footage).to eq('1000')
  end
end
