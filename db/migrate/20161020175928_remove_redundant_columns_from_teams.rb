class RemoveRedundantColumnsFromTeams < ActiveRecord::Migration[5.0]
  def change
    remove_column :teams, :workers
    remove_column :teams, :supplies
  end
end
