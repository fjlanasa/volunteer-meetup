class AddColumnsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :labor, :boolean, default: false
    add_column :users, :supplies, :boolean, default: false
    add_column :users, :max_milage, :integer, default: 9999, null: false
    add_column :users, :location, :string
  end
end
