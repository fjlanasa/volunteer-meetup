class AddUserIdToSites < ActiveRecord::Migration[5.0]
  def change
    add_column :sites, :user_id, :integer, null: false
  end
end
