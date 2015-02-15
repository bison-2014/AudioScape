class AddCoverartToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :coverart, :string
  end
end
