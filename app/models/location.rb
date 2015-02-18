class Location < ActiveRecord::Base
<<<<<<< HEAD

	has_many :taggings
	has_many :users, through: :taggings
	has_many :playlists, through: :taggings
end
