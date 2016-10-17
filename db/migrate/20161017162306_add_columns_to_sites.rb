class AddColumnsToSites < ActiveRecord::Migration[5.0]
  def up
    add_column :sites, :contact_name, :string, null: false
    add_column :sites, :contact_phone, :string, null: false
    add_column :sites, :square_footage, :string, null: false
    add_column :sites, :special_details, :text
  end

  def down
    remove_column :sites, :contact_name
    remove_column :sites, :contact_phone
    remove_column :sites, :square_footage
    remove_column :sites, :special_details
  end
end
