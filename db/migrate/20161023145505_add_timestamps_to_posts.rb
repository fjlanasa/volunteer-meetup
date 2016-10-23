class AddTimestampsToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :created_at, :datetime
    add_column :posts, :updated_at, :datetime
  end
end
