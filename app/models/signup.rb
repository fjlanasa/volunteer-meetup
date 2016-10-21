class Signup < ActiveRecord::Base
  validates :user_id, presence: true
  validates :team_id, presence: true

  belongs_to :user
  belongs_to :team

  after_create :update_team

  def update_team
    team = Team.find(team_id)
    user = User.find(user_id)
    if user.labor
      team.increment!(:total_workers, by = 1)
    end
    if user.supplies
      team.increment!(:total_supplies, by = 1)
    end
  end
end
