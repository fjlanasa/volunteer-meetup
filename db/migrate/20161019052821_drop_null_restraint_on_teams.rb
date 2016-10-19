class DropNullRestraintOnTeams < ActiveRecord::Migration[5.0]
  def change
    change_column_null :teams, :meeting_location, true
    change_column_null :teams, :meeting_time, true
  end
end
