class AddNotesToFavorites < ActiveRecord::Migration[5.0]
  def change
    add_column :favorites, :notes, :string
  end
end
