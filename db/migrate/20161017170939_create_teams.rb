class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.belongs_to :user, null: false
      t.string :meeting_location, null: false
      t.string :meeting_time, null: false
      t.integer :workers_needs, null: false
      t.integer :supplies_needed, null: false
    end
  end
end
