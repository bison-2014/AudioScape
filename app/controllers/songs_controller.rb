class SongsController < ApplicationController

  def index

  end

  def new

  end

  def show
    client = Grooveshark::Client.new({session: session[:groove_session]})
    @groove_song = Song.find(params[:id])
    @groove_url = client.get_song_url_by_id(@groove_song.link)
  end

  def create
    song = Song.new(title: params[:song_name], artist: params[:song_artist], link: params[:song_id], playlist_id: params[:playlist_id], coverart: params[:coverart])
    
    if song.coverart != nil
      song.coverart = "http://images.gs-cdn.net/static/albums/#{params[:coverart]}"
      song.save
    else
      song.coverart = "http://1.bp.blogspot.com/-NFIeRN1TNpU/Ukou19njwHI/AAAAAAAAARQ/iypdhkQVZvI/s200/7313935-heavy-metal-rock-and-roll-devil-horns-hand-sign-with-a-black-leather-studded-bracelet.jpg"
      song.save
    end
    
    redirect_to "/playlists/#{params[:playlist_id]}/"
  end

  def destroy

  end

  def update

  end

  def search

    client = Grooveshark::Client.new({session: session[:groove_session]})
    @artist_search_results = client.search_songs(params[:songs][:title])

  end

end
