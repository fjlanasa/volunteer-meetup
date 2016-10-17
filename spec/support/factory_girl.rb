FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user1#{n}@gmail.com" }
    sequence(:password) { |n| "password#{n}" }
    phone_number '111-111-1111'
    first_name 'Frank'
    last_name 'LaNasa'
  end

  # factory :team do
  #   user
  #
  # end
end
