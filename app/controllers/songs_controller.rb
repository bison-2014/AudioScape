class SongsController < ApplicationController

  def index

  end

  def new

  end

  def show
    @spot_song = Song.find(params[:id])
  end

  def create
    track = RSpotify::Track.find(params[:song_id])
    song = Song.create(title: track.name, artist: track.artists.first.name, link: track.uri, playlist_id: params[:playlist_id])
    redirect_to "/playlists/#{params[:playlist_id]}/songs/new"

  end

  def destroy

  end

  def update

  end

  def search
    @songs = []
    # counter = 0
    # until @songs.length > 0
      tracks = RSpotify::Track.search(params[:songs][:title], limit: 50)

      tracks.each do |track|
        @songs << track if track.artists.first.name.downcase == params[:songs][:artist] || track if track.artists.first.name.downcase == 'various artists'
      end
      # counter += 50
    # end
    # redirect_to 'search'
  end

end
