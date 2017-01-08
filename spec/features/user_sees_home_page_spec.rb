require 'rails_helper'

feature 'user sees home page' do
  scenario 'home page', js: true do
    visit '/'
    save_and_open_page
  end
end
