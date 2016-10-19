class DeleteVolunteers < ActiveRecord::Migration[5.0]
  def change
    drop_table :volunteers
  end
end
