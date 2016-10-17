class Signup < ActiveRecord::Base
  validates :volunteer_id, presence: true
  validates :team_id, presence: true

  belongs_to :volunteer
  belongs_to :team
end
