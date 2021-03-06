require 'rails_helper'

feature 'user deletes account' do
  scenario 'user goes to edit registration page to delete account' do
    user = FactoryGirl.create(:user)
    login_as(user, scope: :user)

    visit '/'
    click_link 'PROFILE'
    expect(page).to have_button 'Cancel my account'
  end
end
