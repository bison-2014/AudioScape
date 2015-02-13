# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
u = User.new(email: "sstrausman@gmail.com", password: "12345678")
u.save
  n = 1
  x = "this is playlist #{n}"
  50.times do
  u.playlists.new(title: x).save
  n += 1
end
