class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :link
      t.references :playlist
      t.string :provider
    end
  end
end
