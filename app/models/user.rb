class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  attr_accessor :address
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:twitter]
  has_many :playlists
  has_many :songs, through: :playlists
  has_many :taggings
  has_many :locations, through: :taggings

  geocoded_by :address   # can also be an IP address
  after_validation :geocode

  validates :username, uniqueness: true

  # extract the information that is available after the authentication.
	def self.from_omniauth(auth)
		where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
		user.provider = auth.provider
		user.uid = auth.uid
		user.username = auth.uid
		user.email = auth.info.email
		user.password = Devise.friendly_token[0,20]

		end
	end
end
