class Team < ActiveRecord::Base
  validates :organizer_id, presence: true
  validates :open, presence: true
  validates_inclusion_of :open, in: [true, false]
  validates :total_workers, presence: true
  validates :total_workers, numericality: {greater_than_or_equal_to: 0}
  validates :total_supplies, presence: true
  validates :total_supplies, numericality: {greater_than_or_equal_to: 0}

  belongs_to :site
  has_many :signups, dependent: :destroy
  has_many :users, through: :signups
end
