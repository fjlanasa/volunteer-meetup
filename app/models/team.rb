class Team < ActiveRecord::Base
  validates :meeting_location, presence: true
  validates :meeting_time, presence: true
  validates :user_id, presence: true
  validates :open, presence: true
  validates_inclusion_of :open, in: [true, false]
  validates :workers, presence: true
  validates :workers, numericality: {greater_than_or_equal_to: 0}
  validates :supplies, presence: true
  validates :supplies, numericality: {greater_than_or_equal_to: 0}

  belongs_to :user
  has_many :signups
  has_many :volunteers, through: :signups
end
