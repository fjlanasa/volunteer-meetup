class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.belongs_to :team, null: false
      t.belongs_to :user, null: false
    end
  end
end
