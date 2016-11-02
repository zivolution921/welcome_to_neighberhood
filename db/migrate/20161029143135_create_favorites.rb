class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :address
      t.boolean :visited
    end
  end
end
