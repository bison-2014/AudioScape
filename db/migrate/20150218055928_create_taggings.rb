class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.references :playlist, index: true
      t.references :location, index: true
      t.references :user

      t.timestamps null: false
    end
    add_foreign_key :taggings, :playlists
    add_foreign_key :taggings, :locations
  end
end
