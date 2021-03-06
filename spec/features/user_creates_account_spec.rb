require 'rails_helper'

feature 'user can create an account' do
  scenario 'user is brought to page with form to create account' do

    visit '/'

    click_link 'SIGN UP'

    expect(page).to have_content 'Sign up'
  end

  scenario 'user successfully creates new account' do
    visit '/users/sign_up'

    fill_in 'First Name', with: 'Frank'
    fill_in 'Last Name', with: 'LaNasa'
    fill_in 'Phone Number', with: '504-111-2323'
    fill_in 'Email', with: 'fjlanasa@gmail.com'
    fill_in 'Password', with: 'password1!'
    fill_in 'Password confirmation', with: 'password1!'
    click_button 'Sign up'
    user = User.last
    expect(user.first_name).to eq('Frank')
    expect(user.email).to eq('fjlanasa@gmail.com')
  end


  scenario 'user attempts to sign in email already in use' do
    visit 'users/sign_up'

    user = FactoryGirl.create(:user)

    fill_in 'First Name', with: 'Krystal'
    fill_in 'Last Name', with: 'Cantos'
    fill_in 'Phone Number', with: '504-111-2323'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'
    expect(page).to have_content 'Email has already been taken'
  end

  scenario 'user attempts to sign up without first and last name' do
    visit 'users/sign_up'

    fill_in 'Email', with: 'myemail@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Sign up'
    expect(page).to have_content 'First name can\'t be blank'
  end
end
