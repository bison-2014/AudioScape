class CreatePlaylist < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title
      t.references :user
    end
  end
end
