require 'open-uri'
require 'json'

class Site < ActiveRecord::Base
  validates :location, presence: true
  validates :contact_name, presence: true
  validates :contact_phone, presence: true
  validates :contact_phone, format: { with: /\A[0-9]{3}-[0-9]{3}-[0-9]{4}\z/, message: 'must be in format ###-###-####' }
  validates :square_footage, presence: true
  validates :user_id, presence: true

  belongs_to :user
  has_one :team, dependent: :destroy

  def formatted_address
    location.gsub(/\s/, '+')
  end

  def geolocate
    formatted_address = self.formatted_address
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{formatted_address}&key=#{ENV['GOOGLE_MAPS_KEY']}"
    url = URI.parse(url)
    str = url.read
    data = JSON.parse(str)
    if !data['results'].empty?
      data['results'][0]['geometry']['location']
    else
      nil
    end
  end
end
