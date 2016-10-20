class Signup < ActiveRecord::Base
  validates :user_id, presence: true
  validates :team_id, presence: true

  belongs_to :user
  belongs_to :team
end
