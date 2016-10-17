class Volunteer < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :phone_number, presence: true
  validates :phone_number, format: { with: /\A[0-9]{3}-[0-9]{3}-[0-9]{4}\z/, message: 'must be in format ###-###-####' }
  validates_inclusion_of :labor, in: [true, false]
  validates_inclusion_of :supplies, in: [true, false]
end
