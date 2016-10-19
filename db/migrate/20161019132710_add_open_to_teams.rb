class AddOpenToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :open, :boolean, null: false, default: true
    add_column :teams, :workers, :integer, null: false, default: 0
    add_column :teams, :supplies, :integer, null: false, default: 0
  end
end
