class AddImgUrlToSites < ActiveRecord::Migration[5.0]
  def change
    add_column :sites, :static_map_url, :string
  end
end
