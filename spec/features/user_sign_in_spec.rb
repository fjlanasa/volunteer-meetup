require 'rails_helper'

feature 'user sign in' do
  scenario 'user gets to login page from home page' do
    visit '/'
    click_link 'SIGN IN'

    expect(page).to have_content 'SIGN IN'
    expect(page).to have_content 'Email'
    expect(page).to have_content 'Password'
  end
  scenario 'user successfully signs in' do
    visit '/users/sign_in'

    expect(page).to have_content 'SIGN IN'
    expect(page).to have_content 'Email'
    expect(page).to have_content 'Password'

    user = FactoryGirl.create(:user)

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign in'
    expect(page).to have_link 'SIGN OUT'
    expect(page).to have_link 'PROFILE'
  end

  scenario 'user attempts to sign in with blank form' do
    visit '/users/sign_in'

    click_button 'Sign in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user attempts to sign in without creating an account' do
    visit 'users/sign_in'

    fill_in 'Email', with: 'exampleemail@gmail.com'
    fill_in 'Password', with: 'mysupersecurepassword'

    click_button 'Sign in'
    expect(page).to have_content 'Invalid Email or password'
  end

  scenario 'user sign out' do
    user = FactoryGirl.create(:user)
    login_as(user, scope: :user)

    visit '/'
    expect(page).to have_content 'PROFILE'
    expect(page).to have_content 'SIGN OUT'

    click_link 'SIGN OUT'
    expect(page).to have_link 'SIGN UP'
    expect(page).to have_link 'SIGN IN'
  end
end
