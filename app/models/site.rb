class Site < ActiveRecord::Base
  validates :location, presence: true
  validates :contact_name, presence: true
  validates :contact_phone, presence: true
  validates :contact_phone, format: { with: /\A[0-9]{3}-[0-9]{3}-[0-9]{4}\z/, message: 'must be in format ###-###-####' }
  validates :square_footage, presence: true
  validates :user_id, presence: true

  belongs_to :user
end
