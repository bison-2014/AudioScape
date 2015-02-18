module ApplicationHelper

  def groove_session
    Grooveshark::Client.new(session: session[:groove_session])
  end

  def find_random_local_songs
    random_songs = []
    if current_users_around.empty?
      result = "Sorry! No users around right now!"
    else
      current_users_around.each do |user|
        unless user.playlists.empty?
          @playlist = user.playlists.sample
          unless @playlist.songs.empty?
            song = @playlist.songs.sample
            random_songs << song
          end
        end
      end
      return random_songs
    end

  end

end
