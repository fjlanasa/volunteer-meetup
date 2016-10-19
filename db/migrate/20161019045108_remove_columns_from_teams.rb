class RemoveColumnsFromTeams < ActiveRecord::Migration[5.0]
  def change
    remove_column :teams, :workers_needs
    remove_column :teams, :supplies_needed
  end
end
