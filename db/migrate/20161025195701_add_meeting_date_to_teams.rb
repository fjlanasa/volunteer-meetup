class AddMeetingDateToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :meeting_date, :string
  end
end
