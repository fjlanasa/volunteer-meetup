FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "user1#{n}@gmail.com" }
    sequence(:password) { |n| "password#{n}" }
    phone_number '111-111-1111'
    sequence(:first_name) { |n| "First|#{n}" }
    sequence(:last_name) { |n| "Last#{n}" }
  end

  factory :site do
    location '40487 Fox Run Drive, Gonzales, LA 70737'
    user
    contact_name 'SiteUser'
    contact_phone '111-111-1111'
    square_footage '2000'
    lat 30.285043
    lng -90.923277
    static_map_url 'https://maps.googleapis.com/maps/api/staticmap?center=40487+' +
    'Fox+Run+Drive,+Gonzales,+LA,+United+States&zoom=13&size=500x250&maptype=' +
    'roadmap&markers=color:blue%7C30.285043,-90.923277&key=AIzaSyDY93x-q2nAll3k526ifT8OpF2Silq-VEI'
  end

  factory :team do
    organizer_id 1
    total_supplies 0
    total_workers 0
    meeting_location '11 Villar Road Gonzales LA 70737'
    meeting_date '2016 10 31'
    meeting_time '11:00'
    open true
    site
  end

  factory :post do
    sequence(:body) { |n| "Post number #{n}!"}
    user
    team
  end
end
