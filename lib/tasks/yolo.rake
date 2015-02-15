namespace :db do 

  desc "YOLO that DB, Kid!"
  task :yolo => [:drop, :create, :migrate, :seed]

end