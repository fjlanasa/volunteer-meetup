class ChangeVolToUserInSignups < ActiveRecord::Migration[5.0]
  def change
    remove_column :signups, :volunteer_id
    add_column :signups, :volunteer_id, :integer, null: false
  end
end
