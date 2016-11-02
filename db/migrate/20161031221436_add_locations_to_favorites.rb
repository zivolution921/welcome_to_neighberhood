class AddLocationsToFavorites < ActiveRecord::Migration[5.0]
  def change
    add_column :favorites, :lat, :string
    add_column :favorites, :lng, :string
  end
end
