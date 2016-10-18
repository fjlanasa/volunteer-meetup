class AddMaxMilageToVolunteers < ActiveRecord::Migration[5.0]
  def up
    add_column :volunteers, :max_milage, :integer, null: false, default: 9999
  end

  def down
    remove_column :volunteers, :max_milage
  end
end
