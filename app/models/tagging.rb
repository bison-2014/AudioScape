class Tagging < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :location
  belongs_to :user
end
