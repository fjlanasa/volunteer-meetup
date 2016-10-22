class Signup < ActiveRecord::Base
  validates :user_id, presence: true
  validates :team_id, presence: true
  validates_inclusion_of :labor, in: [true, false]
  validates :supplies, numericality: {greater_than_or_equal_to: 0}

  belongs_to :user
  belongs_to :team

  after_save :update_team_after_signup
  after_destroy :update_team_after_leave

  def update_team_after_signup
    team = Team.find(team_id)
    team.update_totals
  end

  def update_team_after_leave
    team = Team.find(team_id)
    team.update_totals
  end
end
