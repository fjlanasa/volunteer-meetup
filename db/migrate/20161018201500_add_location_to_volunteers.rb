class AddLocationToVolunteers < ActiveRecord::Migration[5.0]
  def up
    add_column :volunteers, :location, :string
  end

  def down
    remove_column :volunteers, :location
  end
end
