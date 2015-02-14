class Song < ActiveRecord::Base
  belongs_to :playlist
  
  
  validates_uniqueness_of :link, :scope => [:title, :artist, :service_type]
  
end