class CreateSignups < ActiveRecord::Migration[5.0]
  def change
    create_table :signups do |t|
      t.integer :volunteer_id, null: false
      t.integer :team_id, null: false
    end
  end
end
