class AddForeignKeysToTables < ActiveRecord::Migration[5.0]
  def change
    add_column :sites, :team_id, :integer
  end
end
