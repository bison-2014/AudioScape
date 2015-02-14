class SongsController < ApplicationController

  def index

  end

  def new

  end

  def show
    @spot_song = Song.find(params[:id])
  end

  def create
    client = Grooveshark::Client.new({session: session[:groove_session]})
    groove_song = client.get_song_url_by_id(params[:song_id])
    song = Song.create(title: params[:song_name], artist: params[:song_artist], link: groove_song, playlist_id: params[:playlist_id])
    redirect_to "/playlists/#{params[:playlist_id]}/songs/new"

  end

  def destroy

  end

  def update

  end

  def search
    @songs = []

    client = Grooveshark::Client.new({session: session[:groove_session]})
    tracks = client.search_songs(params[:songs][:title])

      tracks.each do |track|
        @songs << track if track.artist.downcase == params[:songs][:artist] || track if track.artist.downcase == 'various artists'
      end

  end

end
