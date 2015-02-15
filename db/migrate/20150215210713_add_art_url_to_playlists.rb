class AddArtUrlToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :art_url, :string
  end
end
