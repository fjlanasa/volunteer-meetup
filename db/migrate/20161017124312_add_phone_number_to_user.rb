class AddPhoneNumberToUser < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :phone_number, :string, null: false
  end

  def down
    remove_column :users, :phone_number
  end
end
