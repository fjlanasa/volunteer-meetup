class ChangeUserToVolInTeams < ActiveRecord::Migration[5.0]
  def change
    remove_column :teams, :user_id
    add_column :teams, :organizer_id, :integer, null: false
  end
end
