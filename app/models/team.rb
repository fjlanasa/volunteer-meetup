class Team < ActiveRecord::Base
  validates :meeting_location, presence: true
  validates :meeting_time, presence: true
  validates :user_id, presence: true

  belongs_to :user
  has_many :signups
  has_many :volunteers, through: :signups
end
