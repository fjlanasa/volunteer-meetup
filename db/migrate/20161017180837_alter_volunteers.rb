class AlterVolunteers < ActiveRecord::Migration[5.0]
  def change
    remove_column :volunteers, :first_name
    remove_column :volunteers, :last_name
    remove_column :volunteers, :phone_number
    remove_column :volunteers, :email
    add_column :volunteers, :user_id, :integer, null: false
  end
end
