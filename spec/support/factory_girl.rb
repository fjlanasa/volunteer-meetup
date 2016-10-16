FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user1#{n}@gmail.com" }
    sequence(:password) { |n| "password#{n}" }
    first_name 'Frank'
    last_name 'LaNasa'
  end
end
