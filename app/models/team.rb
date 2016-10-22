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

  def update_totals
    total_supplies = 0
    total_workers = 0
    self.signups.each do |signup|
      total_supplies += signup.supplies
      if signup.labor == true
        total_workers += 1
      end
    end
    self.update_attribute(:total_workers, total_workers)
    self.update_attribute(:total_supplies, total_supplies)
  end
end
