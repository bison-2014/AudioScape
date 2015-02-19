class SongsController < ApplicationController
  STOCK_IMG = "http://static7.depositphotos.com/1001655/707/v/950/depositphotos_7070089-Woman-with-music-notes.jpg"
  def index

  end

  def new

    render 'new', layout: false

  end

  def show
    client = Grooveshark::Client.new({session: session[:groove_session]})
    @groove_song = Song.find(params[:id])
    @groove_url = client.get_song_url_by_id(@groove_song.link)
  end

  def create
    song = Song.new(title: params[:song_name], artist: params[:song_artist], link: params[:song_id], playlist_id: params[:playlist_id], coverart: params[:coverart])

    if song.coverart = ''
      song.coverart = STOCK_IMG
      song.save  
    else
      song.coverart = "http://images.gs-cdn.net/static/albums/#{params[:coverart]}"
      song.save
    end

    redirect_to "/playlists/#{params[:playlist_id]}/"
  end

  def destroy
    playlist = Playlist.find(params[:playlist_id])
    song = playlist.songs.find(params[:id])
    song.destroy

    redirect_to playlist
  end

  def update

  end

  def search
    @playlist = Playlist.find(params[:playlist_id])
    client = Grooveshark::Client.new({session: session[:groove_session]})
    @artist_search_results = client.search_songs(params[:songs][:title]).first(20)
    render 'search', layout: false
  end

end
