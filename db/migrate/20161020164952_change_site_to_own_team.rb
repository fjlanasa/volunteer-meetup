class ChangeSiteToOwnTeam < ActiveRecord::Migration[5.0]
  def change
    remove_column :sites, :team_id
    add_column :teams, :site_id, :integer, null: false
  end
end
