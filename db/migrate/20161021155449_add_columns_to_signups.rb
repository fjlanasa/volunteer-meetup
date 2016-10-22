class AddColumnsToSignups < ActiveRecord::Migration[5.0]
  def change
    add_column :signups, :labor, :boolean, default: true
    add_column :signups, :supplies, :integer, default: 0
  end
end
