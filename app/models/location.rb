class Location < ActiveRecord::Base
	has_many :taggings
	has_many :users, through: :taggings
	has_many :playlists, through: :taggings
end
