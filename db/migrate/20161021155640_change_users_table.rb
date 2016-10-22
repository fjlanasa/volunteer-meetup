class ChangeUsersTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :supplies
    add_column :users, :supplies, :integer, default: 0
  end
end
