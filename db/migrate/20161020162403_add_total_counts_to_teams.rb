class AddTotalCountsToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :total_workers, :integer, default: 0, null: false
    add_column :teams, :total_supplies, :integer, default: 0, null: false
  end
end
