class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :link
      t.string :source
      t.references :playlist

    end
  end
end
