class Volunteer < ActiveRecord::Base
  validates :user_id, presence: true
  validates_inclusion_of :labor, in: [true, false]
  validates_inclusion_of :supplies, in: [true, false]

  belongs_to :user
  has_many :signups
  has_many :teams, through: :signups

  def first_name
    user.first_name
  end

  def last_name
    user.last_name
  end

  def phone_number
    user.phone_number
  end

  def email
    user.email
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
